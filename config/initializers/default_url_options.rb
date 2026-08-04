app_url = ENV["APP_URL"].presence
if app_url.nil?
  raise "APP_URL must be set" if Rails.env.production?

  app_url = "http://localhost:#{ENV.fetch('PORT', '3000')}"
end

uri = URI.parse(app_url)
opts = { host: uri.host, protocol: uri.scheme }
opts[:port] = uri.port if uri.port && uri.port != uri.default_port

Rails.application.default_url_options = opts
Rails.application.config.action_mailer.default_url_options = opts
Rails.application.routes.default_url_options = opts
