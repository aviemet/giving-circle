require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Settings::Integrations", type: :request do
  describe "GET /settings/:circle_slug/integrations" do
    login_super_admin

    it "renders a successful response" do
      circle = @admin.circles.first
      create(:integration, circle: circle)

      get settings_integrations_path(circle)

      expect(response).to be_successful
    end
  end

  describe "POST /settings/:circle_slug/integrations" do
    login_super_admin

    it "creates an integration" do
      circle = @admin.circles.first

      expect {
        post settings_integrations_path(circle), params: {
          integration: {
            name: "Circle SMTP",
            provider: "smtp",
            medium: "email",
            active: true,
            credentials: {
              host: "smtp.example.com",
              port: "587",
              username: "user",
              password: "secret",
            },
          },
        }
      }.to change(Integration, :count).by(1)

      expect(response).to redirect_to(edit_settings_integration_path(circle, Integration.last))
    end
  end
end
