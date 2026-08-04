module Messaging
  class BatchRecipient
    attr_reader :membership_id, :to, :body, :subject

    def initialize(membership_id:, to:, body:, subject: nil)
      @membership_id = membership_id.to_s
      @to = to
      @body = body
      @subject = subject
    end
  end
end
