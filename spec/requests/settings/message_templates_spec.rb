require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Settings::MessageTemplates", type: :request do
  describe "GET /settings/:circle_slug/message_templates" do
    login_super_admin

    it "renders a successful response" do
      circle = @admin.circles.first
      create(:message_template, circle: circle)

      get settings_message_templates_path(circle)

      expect(response).to be_successful
    end
  end

  describe "POST /settings/:circle_slug/message_templates" do
    login_super_admin

    it "creates a message template" do
      circle = @admin.circles.first

      expect {
        post settings_message_templates_path(circle), params: {
          message_template: {
            name: "Reminder",
            medium: "email",
            subject: "Hello",
            body: "<p>Body</p>",
          },
        }
      }.to change(MessageTemplate, :count).by(1)

      expect(response).to redirect_to(edit_settings_message_template_path(circle, MessageTemplate.last))
    end
  end
end
