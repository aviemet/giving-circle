module Messaging
  module ProviderCatalog
    AUTH_PROFILES = {
      "smtp" => {
        fields: [
          { key: "host", secret: false },
          { key: "port", secret: false },
          { key: "username", secret: false },
          { key: "password", secret: true },
        ],
      },
      "basic_auth" => {
        fields: [
          { key: "username", secret: false },
          { key: "password", secret: true },
        ],
      },
      "api_token" => {
        fields: [
          { key: "api_token", secret: true },
        ],
      },
    }.freeze

    PRESETS = {
      "smtp" => {
        medium: "email",
        auth_profile: "smtp",
        adapter: "Messaging::Adapters::Smtp",
        fields: nil,
      },
      "mailerlite" => {
        medium: "email",
        auth_profile: "api_token",
        adapter: "Messaging::Adapters::Mailerlite",
        fields: [
          { key: "api_token", secret: true },
          { key: "from_email", secret: false },
        ],
      },
      "twilio" => {
        medium: "sms",
        auth_profile: "basic_auth",
        adapter: "Messaging::Adapters::Twilio",
        fields: [
          { key: "account_sid", secret: false },
          { key: "auth_token", secret: true },
          { key: "from_number", secret: false },
        ],
      },
      "plivo" => {
        medium: "sms",
        auth_profile: "basic_auth",
        adapter: "Messaging::Adapters::Plivo",
        fields: [
          { key: "auth_id", secret: false },
          { key: "auth_token", secret: true },
          { key: "from_number", secret: false },
        ],
      },
    }.freeze

    module_function

    def provider_ids
      PRESETS.keys
    end

    def providers_by_medium
      PRESETS.each_with_object({}) do |(provider, preset), result|
        medium = preset.fetch(:medium)
        result[medium] ||= []
        result[medium] << provider
      end
    end

    def medium_for(provider)
      preset = PRESETS[provider.to_s]
      return nil if preset.nil?

      preset.fetch(:medium)
    end

    def providers_hash
      PRESETS.transform_values { |preset| preset.fetch(:medium) }.freeze
    end

    def auth_profile_for(provider)
      preset = PRESETS[provider.to_s]
      return nil if preset.nil?

      preset.fetch(:auth_profile)
    end

    def fields_for(provider)
      preset = PRESETS[provider.to_s]
      return nil if preset.nil?

      fields = preset[:fields]
      return fields if fields

      profile = AUTH_PROFILES[preset.fetch(:auth_profile)]
      return nil if profile.nil?

      profile.fetch(:fields)
    end

    def credential_keys(provider)
      fields = fields_for(provider)
      return nil if fields.nil?

      fields.map { |field| field.fetch(:key) }
    end

    def credential_fields_by_provider
      PRESETS.keys.index_with { |provider| credential_keys(provider) }.freeze
    end

    def adapter_class(provider)
      preset = PRESETS[provider.to_s]
      raise ArgumentError, "Unknown messaging provider: #{provider}" if preset.nil?

      preset.fetch(:adapter).constantize
    end

    def presets_for_form
      PRESETS.transform_values do |preset|
        provider_fields = preset[:fields] || AUTH_PROFILES.fetch(preset.fetch(:auth_profile)).fetch(:fields)
        {
          "medium" => preset.fetch(:medium),
          "auth_profile" => preset.fetch(:auth_profile),
          "fields" => provider_fields.map { |field|
            {
              "key" => field.fetch(:key),
              "secret" => field.fetch(:secret),
            }
          },
        }
      end
    end
  end
end
