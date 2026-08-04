module Messaging
  class Registry
    def self.adapter_for(integration)
      ProviderCatalog.adapter_class(integration.provider).new(integration)
    end
  end
end
