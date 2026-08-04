module Messaging
  class SendPresentationMessage
    class Error < StandardError; end

    def initialize(presentation_message:, membership_ids: nil)
      @presentation_message = presentation_message
      @membership_ids = membership_ids
    end

    def call
      raise Error, "Message is not ready to send" unless presentation_message.ready?
      raise Error, "Integration is required" if presentation_message.integration.nil?
      raise Error, "Integration is inactive" unless presentation_message.integration.active?

      presentation_message.update!(status: "sending", delivery_results: {})

      Messaging::SendPresentationMessageJob.perform_later(
        presentation_message.id,
        membership_ids,
      )
      presentation_message
    end

    def self.perform_now(presentation_message, membership_ids: nil)
      new(presentation_message: presentation_message, membership_ids: membership_ids).deliver_now
    end

    def deliver_now
      resolved = RecipientsResolver.new(
        presentation_message: presentation_message,
        membership_ids: membership_ids,
      ).call
      batch_result = BatchResult.new(resolved.skipped)

      if resolved.recipients.any?
        adapter = Registry.adapter_for(presentation_message.integration)
        batch_result.merge!(adapter.deliver_batch(resolved.recipients))
      end

      presentation_message.update!(
        status: "finished",
        delivery_results: batch_result.to_delivery_results,
      )
      presentation_message
    rescue StandardError => e
      presentation_message.update!(
        status: "finished",
        delivery_results: presentation_message.delivery_results.merge(
          "_batch" => {
            "status" => "failed",
            "error_message" => e.message,
          },
        ),
      )
      raise
    end

    private

    attr_reader :presentation_message, :membership_ids
  end
end
