module Messaging
  class RecipientOutcome
    attr_reader :membership_id, :recipient, :status, :code, :error_message, :provider_message_id, :skip_reason

    def initialize(
      membership_id:,
      recipient:,
      status:,
      code: nil,
      error_message: nil,
      provider_message_id: nil,
      skip_reason: nil
    )
      @membership_id = membership_id.to_s
      @recipient = recipient
      @status = status.to_s
      @code = code
      @error_message = error_message
      @provider_message_id = provider_message_id
      @skip_reason = skip_reason
    end

    def to_h
      {
        "recipient" => recipient,
        "status" => status,
        "code" => code,
        "error_message" => error_message,
        "provider_message_id" => provider_message_id,
        "skip_reason" => skip_reason,
      }.compact
    end
  end
end
