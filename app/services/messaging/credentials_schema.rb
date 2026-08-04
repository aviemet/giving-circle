module Messaging
  module CredentialsSchema
    def self.for(provider)
      ProviderCatalog.credential_keys(provider)
    end

    def self.schemas
      ProviderCatalog.credential_fields_by_provider
    end
  end
end
