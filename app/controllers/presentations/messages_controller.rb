class Presentations::MessagesController < ApplicationController
  include FriendlyIdHistory
  historical_slug_redirect_values Presentation::Message, :slug

  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug
  expose :theme, id: -> { params[:theme_slug] }, find_by: :slug
  expose :presentation, id: -> { params[:presentation_slug] }, scope: -> { theme.presentations }, find_by: :slug

  expose :presentation_messages, -> {
    search(presentation.messages.includes_associated)
  }

  expose :presentation_message,
    model: "Presentation::Message",
    scope: -> { presentation.messages.includes_associated },
    id: -> { params[:slug] },
    find: ->(slug, scope) { scope.friendly.find(slug) }

  strong_params :presentation_message, permit: [
    :name,
    :medium,
    :subject,
    :body,
    :integration_id,
    :message_template_id,
    :skip_interaction_id,
  ]

  sortable_fields %w(name slug medium status)

  before_action :authorize_presentation

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/messaging (theme_presentation_messaging)
  def index
    render inertia: "Presentations/Messages/Index", props: messaging_index_props
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/messaging/messages/new (new_theme_presentation_message)
  def new
    template = find_template
    message = if template
                Presentation::Message.new(
                  presentation: presentation,
                  message_template: template,
                  name: template.name,
                  medium: template.medium,
                  subject: template.subject,
                  body: template.body,
                  status: "ready",
                )
              else
                Presentation::Message.new(presentation: presentation, medium: "email", body: "", status: "ready")
              end

    render inertia: "Presentations/Messages/New", props: {
      presentation: presentation.render(:persisted),
      presentation_message: message.render(:form_data),
      circle: circle.render(:persisted),
      theme: theme.render(:persisted),
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/messaging/messages/:slug/edit (edit_theme_presentation_message)
  def edit
    render inertia: "Presentations/Messages/Edit", props: {
      presentation: presentation.render(:persisted),
      presentation_message: presentation_message.render(:form_data),
      circle: circle.render(:persisted),
      theme: theme.render(:persisted),
    }
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/messaging/messages (theme_presentation_messages)
  def create
    presentation_message.presentation = presentation
    presentation_message.status = "ready"

    if presentation_message.save
      redirect_to edit_theme_presentation_message_path(circle, theme, presentation, presentation_message),
        notice: t("presentation_messages.notices.created")
    else
      redirect_to new_theme_presentation_message_path(circle, theme, presentation),
        inertia: { errors: presentation_message.errors }
    end
  end

  # @route PATCH /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/messaging/messages/:slug (theme_presentation_message)
  # @route PUT /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/messaging/messages/:slug (theme_presentation_message)
  def update
    if presentation_message.finished?
      redirect_to edit_theme_presentation_message_path(circle, theme, presentation, presentation_message),
        alert: t("presentation_messages.notices.locked")
      return
    end

    if presentation_message.update(presentation_message_params)
      redirect_to edit_theme_presentation_message_path(circle, theme, presentation, presentation_message),
        notice: t("presentation_messages.notices.updated")
    else
      redirect_to edit_theme_presentation_message_path(circle, theme, presentation, presentation_message),
        inertia: { errors: presentation_message.errors }
    end
  end

  # @route DELETE /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/messaging/messages/:slug (theme_presentation_message)
  def destroy
    presentation_message.destroy!
    redirect_to theme_presentation_messaging_path(circle, theme, presentation),
      notice: t("presentation_messages.notices.destroyed")
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/messaging/messages/:slug/send_message (send_theme_presentation_message)
  def send_message
    Messaging::SendPresentationMessage.new(
      presentation_message: presentation_message,
      membership_ids: membership_ids_param,
    ).call
    redirect_to edit_theme_presentation_message_path(circle, theme, presentation, presentation_message),
      notice: t("presentation_messages.notices.sending")
  rescue Messaging::SendPresentationMessage::Error => e
    redirect_to edit_theme_presentation_message_path(circle, theme, presentation, presentation_message),
      alert: e.message
  end

  private

  def membership_ids_param
    return nil unless params.key?(:membership_ids)

    Array(params[:membership_ids]).map(&:to_s)
  end

  def authorize_presentation
    authorize presentation, :messaging?
  end

  def find_template
    return nil if params[:message_template_id].blank?

    circle.message_templates.find_by(id: params[:message_template_id])
  end

  def messaging_index_props
    {
      presentation: -> { presentation.render(:persisted) },
      presentation_messages: -> { presentation_messages.order(created_at: :desc).render(:index) },
      message_templates: -> { circle.message_templates.order(:name).render(:persisted) },
      circle: -> { circle.render(:persisted) },
      theme: -> { theme.render(:persisted) },
    }
  end
end
