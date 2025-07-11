source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.4.4"

# Server
gem "rails", "~> 7.2"
gem "pg", "~> 1.5"
gem "puma", "~> 6.0"

# Assets
gem "inertia_rails", ">= 3.0.0"
gem "vite_rails", "~> 3.0"

# Models
gem "active_type", "~> 2.1"
gem "pg_search", "~> 2.3"
gem "devise", "~> 4.8"
gem "devise_invitable", "~> 2.0"
gem "rolify", "~> 6.0"
gem "pundit", "~> 2.3"
gem "friendly_id", "~> 5.5"
gem "kaminari", "~> 1.2"
gem "money-rails", "~> 1.15"
gem "decent_exposure", "~> 3.0"
gem "boolean_timestamp", "~> 1.1"
gem "jsonb_accessor", "~> 1.3"
gem "oj_serializers", "~> 2.0"
gem "types_from_serializers", "~> 2.1"
gem "rails-settings-cached", "~> 2.9"

# Helpers
gem "factory_bot", ">= 6.4"
gem "factory_bot_rails", ">=6.4"
gem "js-routes", "~> 2.3"
gem "overmind", "~> 2.5"
gem "amazing_print", "~> 1.4"
gem "good_job", "~> 4.7"
gem "activerecord-import", "~> 1.7"
gem "mini_magick", "~> 5.1"
gem "active_storage_validations", "~> 2.0"
gem "thor", "~> 1.3"

gem "tzinfo-data"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Redis adapter to run Action Cable in production

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

group :development, :test do
  gem "rspec-rails", "~> 7.1"
  # gem "pry-rails", "~> 0.3.9"
  gem "pry"
  gem "faker"

  gem "bullet", ">= 7.0"

  # Linting
  gem "rubocop-rails", ">= 2.14", require: false
  gem "rubocop-rspec", ">= 2.9", require: false
  gem "rubocop-performance", ">= 1.13", require: false
  gem "rubocop-daemon", ">= 0.3.2", require: false
  gem "rubocop-capybara", ">= 2.20", require: false
  gem "rubocop-factory_bot", ">= 2.25", require: false

  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[mri mingw x64_mingw]

  gem "dotenv-rails", "~> 3.1"

  # File annotation
  gem "chusaku", "~> 1.2", require: false
  gem "annotaterb", "~> 4.14", require: false
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"

  # Live Reload
  gem "rack-livereload", ">= 0.3.17"
  gem "guard-livereload", ">= 2.5", require: false

  # Security analysis tool
  gem "brakeman", "~> 6.1", require: false

  # Email previews
  gem "letter_opener", "~> 1.10"

  # I18n
  # Report unused and missing locale keys [https://github.com/glebm/i18n-tasks]
  gem "i18n-tasks", "~> 1.0", require: false
  # Generate json and ts locale files from locale.yml files [https://github.com/fnando/i18n-js]
  gem "i18n-js", "~> 4.2", require: false

  # Tools for VSCode
  gem "solargraph", ">= 0.48.0", require: false
  gem "ruby-lsp", ">= 0.23.6", require: false
end

group :test do
  gem "rspec-watcher", "~> 0.3.3"

  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
  gem "generator_spec", ">= 0.9.4"
  gem "database_cleaner-active_record", "~> 2.0"
  gem "shoulda-matchers", "~> 6.4"
  gem "simplecov", "~> 0.22.0"
  gem "pundit-matchers", "~> 3.1"
end
