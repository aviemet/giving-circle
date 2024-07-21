require 'json'
require 'tempfile'
require 'fileutils'

module UrlParamsJson
  class Generator
    attr_accessor :tsx_map

    def self.generate
      url_params = {}

      Rails.application.routes.named_routes.to_a.each do |route|
        next if route[0].match?(/^rails|^new_rails/)

        url_params[route[0].to_s.camelize(:lower)] = {
          path: route[1].path.spec.to_s.gsub(/\(.:format\)/, ''),
          params: route[1].required_parts
        }

        controller = route[1].defaults[:controller]
        action = route[1].defaults[:action]

        next unless route[1].verb == "GET" && !controller.nil? && !action.nil?

        annotate_view_file(controller, action, route)
      end

      generate_js_file(url_params)
    end

    def self.generate_js_file(url_params)
      js_content = "const urlParams = #{JSON.pretty_generate(url_params)} as const;\n\nexport default urlParams;"

      file_path = Rails.root.join("app/frontend/lib/routes/urlParams.ts")
      File.write(file_path, js_content)
    end

    def self.annotate_view_file(controller, action, route)
      path = tsx_file_path(controller, action)

      return if path.nil?

      annotated_file = nil
      Rails.root.join(path).open do |file|
        component_name = find_default_export(file)

        break if component_name == 'Anonymous'

        url_path = route[1].path.spec.to_s.gsub(/\(.:format\)/, '')
        js_route_method = route[0].to_s.camelize(:lower)
        file.rewind
        annotated_file = add_or_update_route_annotation(file, component_name, url_path, js_route_method)
      end

      FileUtils.mv(annotated_file.path, path) unless annotated_file.nil?
    end

    # OLD
    def self.add_tsx_annotations(route_info)
      Rails.root.glob("app/frontend/Pages/**/*.tsx").each do |file_path|
        content = File.read(file_path)

        route_info.each_value do |info|
          component_name = File.basename(file_path, ".tsx")
          next unless content.include?("export default function #{component_name}")

          annotation = "/**\n * @path: #{info[:path]}\n * @route: #{info[:js_route]}\n **/\n"

          updated_content = content.gsub(/(export default function #{component_name})/, "#{annotation}\\1")

          File.write(file_path, updated_content)
        end
      end
    end

  end

  class Middleware
    def initialize(app)
      @app = app
      @routes_file = Rails.root.join("config/routes.rb")
      @mtime = nil
    end

    def call(env)
      update_url_params_json
      @app.call(env)
    end

    protected

    def update_url_params_json
      new_mtime = routes_mtime
      unless new_mtime == @mtime
        regenerate
        @mtime = new_mtime
      end
    end

    def regenerate
      Generator.generate
    end

    def routes_mtime
      File.mtime(@routes_file)
    rescue Errno::ENOENT
      nil
    end
  end
end

def tsx_file_path(controller, action)
  component = nil

  in_target_action = false
  Rails.root.join("app/controllers/#{controller}_controller.rb").open do |file|
    file.each_line do |line|
      if line.match?(/\bdef\s+#{action}\b/)
        in_target_action = true
        next
      end

      next unless in_target_action

      if line.match?(/\bend\b/)
        break
      elsif line.include?('render inertia:')
        match = line.match(/render inertia:\s*["']([^"]+)["']/)
        if match
          path = Rails.root.join("app/frontend/Pages/#{match[1]}/index.tsx")
          component = path if path.exist?
        end
        break
      end
    end
  end

  component
end

def find_default_export(file)
  return unless file

  file.reverse_each do |line|
    next unless line.match?(/^\s*export\s+default/)

    if match = line.match(/(?:function|class|const)\s+(\w+)/)
      return match[1]
    end

    if match = line.match(/export\s+default\s+(\w+)/)
      return match[1]
    end

    return 'Anonymous'
  end

  nil
end

## EXPERIMENTAL
def add_or_update_route_annotation(file, component_name, path, route)
  temp_file = Tempfile.new('temp_file')
  annotation_pattern = %r{/\*\*\n\s*\* @path:.*\n\s*\* @route:.*\n\s*\*/}
  component_pattern = /\b(function|class|const)\s+#{Regexp.escape(component_name)}\b/

  found_annotation = false
  found_component = false

  file.each_line do |line|
    if !found_component && line.match?(annotation_pattern)
      # Update existing annotation
      temp_file.puts generate_annotation(path, route)
      found_annotation = true
    elsif !found_component && line.match?(component_pattern)
      # Add new annotation if none exists
      temp_file.puts generate_annotation(path, route) unless found_annotation
      temp_file.puts line
      found_component = true
    else
      temp_file.puts line
    end
  end

  temp_file
end

def generate_annotation(path, route)
  "/**\n * @path: #{path}\n * @route: #{route}\n */"
end
