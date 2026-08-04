require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Presentations::Messages", type: :request do
  describe "GET messaging" do
    login_super_admin

    it "renders a successful response" do
      circle = @admin.circles.first
      theme = create(:theme, circle: circle)
      presentation = create(:presentation, theme: theme)

      get theme_presentation_messaging_path(circle, theme, presentation)

      expect(response).to be_successful
      expect(inertia).to render_component("Presentations/Messages/Index")
    end
  end

  describe "GET messaging/messages/new" do
    login_super_admin

    it "renders a blank message form" do
      circle = @admin.circles.first
      theme = create(:theme, circle: circle)
      presentation = create(:presentation, theme: theme)

      get new_theme_presentation_message_path(circle, theme, presentation)

      expect(response).to be_successful
      expect(inertia).to render_component("Presentations/Messages/New")
      expect(inertia.props[:presentation_message]["delivery_results"]).to eq({})
      expect(inertia.props[:presentation_message]["mediums"]).to be_present
    end

    it "renders a form from a template" do
      circle = @admin.circles.first
      theme = create(:theme, circle: circle)
      presentation = create(:presentation, theme: theme)
      template = create(:message_template, circle: circle)

      get new_theme_presentation_message_path(circle, theme, presentation), params: {
        message_template_id: template.id,
      }

      expect(response).to be_successful
      expect(inertia).to render_component("Presentations/Messages/New")
      expect(inertia.props[:presentation_message]["name"]).to eq(template.name)
      expect(inertia.props[:presentation_message]["body"]).to eq(template.body)
      expect(inertia.props[:presentation_message]["delivery_results"]).to eq({})
    end
  end

  describe "POST messaging/messages" do
    login_super_admin

    it "creates a presentation message from a template" do
      circle = @admin.circles.first
      theme = create(:theme, circle: circle)
      presentation = create(:presentation, theme: theme)
      template = create(:message_template, circle: circle)
      integration = create(:integration, circle: circle)

      expect {
        post theme_presentation_messages_path(circle, theme, presentation), params: {
          presentation_message: {
            name: template.name,
            medium: template.medium,
            subject: template.subject,
            body: template.body,
            message_template_id: template.id,
            integration_id: integration.id,
          },
        }
      }.to change(Presentation::Message, :count).by(1)

      expect(response).to redirect_to(
        edit_theme_presentation_message_path(circle, theme, presentation, Presentation::Message.last),
      )
    end
  end

  describe "POST messaging/messages/:slug/send_message" do
    login_super_admin

    it "starts a send for a ready message" do
      circle = @admin.circles.first
      theme = create(:theme, circle: circle)
      presentation = create(:presentation, theme: theme)
      integration = create(:integration, circle: circle)
      message = create(:presentation_message, presentation: presentation, integration: integration, status: "ready")

      expect {
        post send_theme_presentation_message_path(circle, theme, presentation, message)
      }.to have_enqueued_job(Messaging::SendPresentationMessageJob)

      expect(message.reload.status).to eq("sending")
      expect(response).to redirect_to(
        edit_theme_presentation_message_path(circle, theme, presentation, message),
      )
    end
  end
end
