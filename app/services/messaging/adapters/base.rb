module Messaging
  module Adapters
    class Base
      def initialize(integration)
        @integration = integration
      end

      def deliver_batch(recipients)
        raise NotImplementedError
      end

      protected

      attr_reader :integration

      def credentials
        integration.credentials || {}
      end

      def credential(key)
        credentials[key.to_s]
      end

      def outcome_for(recipient, status:, code: nil, error_message: nil, provider_message_id: nil)
        RecipientOutcome.new(
          membership_id: recipient.membership_id,
          recipient: recipient.to,
          status: status,
          code: code,
          error_message: error_message,
          provider_message_id: provider_message_id,
        )
      end
    end
  end
end
