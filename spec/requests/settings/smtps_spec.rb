require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Settings::Smtps", type: :request do
  describe "GET /settings/mail" do
    login_super_admin

    it "returns smtps for the circle from the query param" do
      circle = @admin.circles.first
      smtp = create(:smtp, circle:, name: "Circle Mail")

      get settings_smtps_path, params: { circle_slug: circle.slug }

      expect(response).to be_successful
      expect(inertia).to render_component("Settings/Mail/Index")
      expect(inertia.props[:smtps].pluck("name")).to include(smtp.name)
    end

    it "redirects to the first circle when circle_slug is omitted" do
      circle = @admin.circles.first

      get settings_smtps_path

      expect(response).to redirect_to(settings_smtps_path(circle_slug: circle.slug))
    end
  end

  describe "POST /settings/mail" do
    login_super_admin

    it "creates an smtp for the circle from the query param" do
      circle = @admin.circles.first

      post settings_smtps_path, params: {
        circle_slug: circle.slug,
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

      expect(response).to redirect_to(settings_smtp_path(circle.smtps.last, circle_slug: circle.slug))
      expect(circle.smtps.last.name).to eq("Outbound")
    end
  end
end
