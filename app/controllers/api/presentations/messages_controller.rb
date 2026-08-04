class Api::Presentations::MessagesController < Api::ApiController
  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug
  expose :presentation,
    id: -> { params[:presentation_slug] },
    scope: -> { circle.presentations },
    find_by: :slug

  expose :presentation_message,
    model: "Presentation::Message",
    scope: -> { presentation.messages },
    id: -> { params[:slug] },
    find: ->(slug, scope) { scope.friendly.find(slug) }

  # @route GET /api/circles/:circle_slug/presentations/:presentation_slug/messages/:slug (api_circle_presentation_message)
  def show
    authorize presentation, :messaging?

    render json: { presentation_message: message_payload }, status: :ok
  end

  # @route POST /api/circles/:circle_slug/presentations/:presentation_slug/messages/:slug/send_message (send_api_circle_presentation_message)
  def send_message
    authorize presentation, :messaging?

    Messaging::SendPresentationMessage.new(
      presentation_message: presentation_message,
      membership_ids: membership_ids_param,
    ).call
    render json: { presentation_message: message_payload }, status: :accepted
  rescue Messaging::SendPresentationMessage::Error => e
    render json: { error: e.message, presentation_message: message_payload }, status: :unprocessable_content
  end

  # @route GET /api/circles/:circle_slug/presentations/:presentation_slug/messages/:slug/preview_recipients (preview_recipients_api_circle_presentation_message)
  def preview_recipients
    authorize presentation, :messaging?

    resolved = Messaging::RecipientsResolver.new(
      presentation_message: presentation_message,
      membership_ids: membership_ids_param,
    ).call
    preview = Messaging::BatchResult.new(resolved.skipped)
    resolved.recipients.each do |recipient|
      preview.add(
        Messaging::RecipientOutcome.new(
          membership_id: recipient.membership_id,
          recipient: recipient.to,
          status: "pending",
          code: "preview",
        ),
      )
    end

    render json: { delivery_results: preview.to_delivery_results }, status: :ok
  end

  private

  def membership_ids_param
    return nil unless params.key?(:membership_ids)

    Array(params[:membership_ids]).map(&:to_s)
  end

  def message_payload
    {
      slug: presentation_message.slug,
      status: presentation_message.status,
      delivery_results: presentation_message.delivery_results,
    }
  end
end
