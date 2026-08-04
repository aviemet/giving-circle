# frozen_string_literal: true

module InertiaShare::AppUrl
  extend ActiveSupport::Concern

  included do
    inertia_share app_url: -> {
      ENV.fetch("APP_URL") { "http://localhost:#{ENV.fetch('PORT', '3000')}" }.chomp("/")
    }
  end
end
