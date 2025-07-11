require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module GivingCircle
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w(assets tasks))

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    config.time_zone = "Pacific Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    config.autoload_paths += %W(#{config.root}/lib)

    config.generators do |g|
      g.orm :active_record, primary_key_type: :uuid

      g.test_framework      :rspec
      g.view_specs          false
      g.routing_specs       false

      g.template_engine     :tsx
      g.scaffold_stylesheet false
      g.stylesheets         false
      g.javascripts         false
      g.assets              false
      g.helper              false
    end

    config.active_storage.service = :local

    config.active_record.yaml_column_permitted_classes = [Symbol, Hash, Array, Time, Date, ActiveRecord::Base, ActiveSupport::HashWithIndifferentAccess]

    # Establish db connection upon entering rails console
    console do
      ActiveRecord::Base.connection
    end
  end
end
