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

        break if component_name.nil? || component_name == 'Anonymous'

        url_path = route[1].path.spec.to_s.gsub(/\(.:format\)/, '')
        js_route_method = route[0].to_s.camelize(:lower)
        file.rewind
        annotated_file = add_or_update_route_annotation(file, component_name, url_path, js_route_method)
      end

      FileUtils.mv(annotated_file.path, path) unless annotated_file.nil?
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
  annotation_path_pattern = %r{// @path:.*}
  annotation_route_pattern = %r{// @route:.*}
  component_pattern = /\b(function|class|const)\s+#{Regexp.escape(component_name)}\b/

  found_path_annotation = false
  found_route_annotation = false
  component_found = false

  temp_file = Tempfile.new('temp_file')

  buffer = []

  file.each_line do |line|
    buffer << line unless component_found

    case line
    when annotation_path_pattern
      found_path_annotation = true
      if buffer.last != "\n"
        temp_file << "\n"
      end
      temp_file << path_annotation(path)
      next
    when annotation_route_pattern
      found_route_annotation = true
      temp_file << route_annotation(route)
      next
    when component_pattern
      unless found_path_annotation
        if buffer.last != "\n"
          temp_file << "\n"
        end
        temp_file << path_annotation(path)
      end
      temp_file << route_annotation(route) unless found_route_annotation
      component_found = true
    end

    temp_file << line
  end

  temp_file.rewind
  temp_file
end

def path_annotation(path)
  "// @path: #{path}\n"
end

def route_annotation(route)
  "// @route: #{route}\n"
end
