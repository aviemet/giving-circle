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

  describe "GET /settings/:circle_slug/mail/:id" do
    login_super_admin

    it "shows an smtp" do
      circle = @admin.circles.first
      smtp = create(:smtp, circle:)

      get settings_smtp_path(smtp, circle_slug: circle.slug)

      expect(response).to be_successful
      expect(inertia).to render_component("Settings/Mail/Show")
    end
  end

  describe "GET /settings/:circle_slug/mail/new" do
    login_super_admin

    it "renders new smtp form" do
      circle = @admin.circles.first

      get new_settings_smtp_path(circle_slug: circle.slug)

      expect(response).to be_successful
      expect(inertia).to render_component("Settings/Mail/New")
    end
  end

  describe "GET /settings/:circle_slug/mail/:id/edit" do
    login_super_admin

    it "renders edit smtp form" do
      circle = @admin.circles.first
      smtp = create(:smtp, circle:)

      get edit_settings_smtp_path(smtp, circle_slug: circle.slug)

      expect(response).to be_successful
      expect(inertia).to render_component("Settings/Mail/Edit")
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

    it "redirects with errors when create fails" do
      circle = @admin.circles.first

      post settings_smtps_path(circle_slug: circle.slug), params: {
        smtp: {
          name: "",
          host: "",
          security: "tls",
        },
      }

      expect(response).to redirect_to(new_settings_smtp_path(circle_slug: circle.slug))
    end
  end

  describe "PATCH /settings/:circle_slug/mail/:id" do
    login_super_admin

    it "updates an smtp" do
      circle = @admin.circles.first
      smtp = create(:smtp, circle:, name: "Old")

      patch settings_smtp_path(smtp, circle_slug: circle.slug), params: {
        smtp: { name: "Updated", host: smtp.host, security: smtp.security },
      }

      expect(response).to redirect_to(settings_smtp_path(smtp, circle_slug: circle.slug))
      expect(smtp.reload.name).to eq("Updated")
    end

    it "redirects with errors when update fails" do
      circle = @admin.circles.first
      smtp = create(:smtp, circle:)

      patch settings_smtp_path(smtp, circle_slug: circle.slug), params: {
        smtp: { name: "", host: "" },
      }

      expect(response).to redirect_to(edit_settings_smtp_path(smtp, circle_slug: circle.slug))
    end
  end

  describe "DELETE /settings/:circle_slug/mail/:id" do
    login_super_admin

    it "destroys an smtp" do
      circle = @admin.circles.first
      smtp = create(:smtp, circle:)

      expect {
        delete settings_smtp_path(smtp, circle_slug: circle.slug)
      }.to change(Smtp, :count).by(-1)

      expect(response).to redirect_to(settings_smtps_path(circle_slug: circle.slug))
    end
  end
end
