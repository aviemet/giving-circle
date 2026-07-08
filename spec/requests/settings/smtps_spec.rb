require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Settings::Smtps", type: :request do
  describe "GET /settings/:circle_slug/mail" do
    login_super_admin

    it "returns smtps for the circle" do
      circle = @admin.circles.first
      smtp = create(:smtp, circle:, name: "Circle Mail")

      get settings_smtps_path(circle_slug: circle.slug)

      expect(response).to be_successful
      expect(inertia).to render_component("Settings/Mail/Index")
      expect(inertia.props[:smtps].pluck("name")).to include(smtp.name)
    end
  end

  describe "POST /settings/:circle_slug/mail" do
    login_super_admin

    it "creates an smtp for the circle" do
      circle = @admin.circles.first

      post settings_smtps_path(circle_slug: circle.slug), params: {
        smtp: {
          name: "Outbound",
          host: "smtp.example.com",
          port: 587,
          domain: "example.com",
          username: "mailer",
          password: "secret",
          security: "tls",
        },
      }

      expect(response).to redirect_to(settings_smtp_path(circle_slug: circle.slug, id: circle.smtps.last))
      expect(circle.smtps.last.name).to eq("Outbound")
    end
  end
end
