require 'json'

module UrlParamsJson
  class Generator
    def self.generate
      url_params = {}

      Rails.application.routes.named_routes.to_a.each do |route|
        next if route[0].match?(/^rails|^new_rails/)

        url_params[route[0].to_s.camelize(:lower)] = {
          path: route[1].path.spec.to_s.gsub(/\(.:format\)/, ''),
          params: route[1].required_parts
        }
      end

      generate_js_file(url_params)
    end

    def self.generate_js_file(url_params)
      js_content = "const urlParams = #{JSON.pretty_generate(url_params)} as const;\n\nexport default urlParams;"

      file_path = Rails.root.join("app/frontend/lib/routes/urlParams.ts")
      File.write(file_path, js_content)
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
