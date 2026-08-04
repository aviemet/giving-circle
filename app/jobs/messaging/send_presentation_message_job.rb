class Messaging::SendPresentationMessageJob < ApplicationJob
  queue_as :default

  def perform(presentation_message_id, membership_ids = nil)
    presentation_message = Presentation::Message.find(presentation_message_id)
    Messaging::SendPresentationMessage.new(
      presentation_message: presentation_message,
      membership_ids: membership_ids,
    ).deliver_now
  end
end
