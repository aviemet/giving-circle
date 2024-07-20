require 'action_dispatch/routing/inspector'

namespace :url_params do
  desc "Generate urlParams.js file"
  task generate: :environment do
    require_relative 'path/to/url_params_generator'
    UrlParamsGenerator.generate
  end
end

class UrlParamsGenerator
  def self.generate
    routes = Rails.application.routes.routes
    inspector = ActionDispatch::Routing::RoutesInspector.new(routes)
    all_routes = inspector.format(ActionDispatch::Routing::ConsoleFormatter.new, nil)

    url_params = {}

    all_routes.each do |route|
      next if route[:verb].nil? || route[:path].nil? || route[:name].nil?

      path = route[:path].gsub(/\(.:format\)/, '')
      params = path.scan(/:(\w+)/).flatten

      url_params[route[:name]] = {
        path: path,
        params: params
      }
    end

    generate_js_file(url_params)
  end

  def self.generate_js_file(url_params)
    js_content = "const urlParams = #{url_params.to_json};\n\nexport default urlParams;"

    file_path = Rails.root.join("app/frontend/lib/urlParams.js")
    File.write(file_path, js_content)

    puts "Generated urlParams.js in #{file_path}"
  end
end

# Generate the urlParams object and save it to a file
UrlParamsGenerator.generate
