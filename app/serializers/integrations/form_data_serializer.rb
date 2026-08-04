class Integrations::FormDataSerializer < IntegrationSerializer
  attribute :credentials, type: "Record<string, string>" do
    credentials = @object.credentials
    next {} unless credentials.is_a?(Hash)

    credentials
      .except("password", "auth_token", "api_token")
      .transform_values(&:to_s)
  end

  attribute :providers, type: "string[]" do
    Messaging::ProviderCatalog.provider_ids
  end

  attribute :providers_by_medium, type: "Record<string, string[]>" do
    Messaging::ProviderCatalog.providers_by_medium
  end

  attribute :credential_fields, type: "Record<string, string[]>" do
    Messaging::ProviderCatalog.credential_fields_by_provider
  end

  attribute :presets, type: "Record<string, {
    medium: string
    auth_profile: string
    fields: Array<{
      key: string
      secret: boolean
    }>
  }>" do
    Messaging::ProviderCatalog.presets_for_form
  end
end
