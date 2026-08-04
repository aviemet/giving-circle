module Messaging
  class Correlate
    def self.call(recipients:, provider_outcomes_by_to:)
      result = BatchResult.new

      recipients.each do |recipient|
        key = normalize(recipient.to)
        provider_outcome = provider_outcomes_by_to[key]
        if provider_outcome.nil?
          result.add(
            RecipientOutcome.new(
              membership_id: recipient.membership_id,
              recipient: recipient.to,
              status: "failed",
              code: "missing_provider_result",
              error_message: "No provider result for recipient",
            ),
          )
        else
          result.add(
            RecipientOutcome.new(
              membership_id: recipient.membership_id,
              recipient: recipient.to,
              status: provider_outcome[:status] || provider_outcome["status"],
              code: provider_outcome[:code] || provider_outcome["code"],
              error_message: provider_outcome[:error_message] || provider_outcome["error_message"],
              provider_message_id: provider_outcome[:provider_message_id] || provider_outcome["provider_message_id"],
            ),
          )
        end
      end

      result
    end

    def self.normalize(value)
      value.to_s.strip.downcase.gsub(/\s+/, "")
    end
  end
end
