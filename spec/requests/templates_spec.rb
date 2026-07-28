require "rails_helper"
require_relative "../support/devise"

RSpec.describe "/templates", type: :request do
  describe "GET /show" do
    login_super_admin

    it "renders a successful response with template slides" do
      circle = @admin.circles.first
      template = create(:template, circle:)
      slide = create(:slide, title: "Intro")
      template.slides << slide

      get settings_template_url(circle, template)

      expect(response).to be_successful
    end
  end

  describe "GET /index" do
    login_super_admin

    it "renders a successful response when themes have orgs" do
      circle = @admin.circles.first
      theme = create(:theme, circle:)
      org = create(:org, circle:)
      create(:themes_org, theme:, org:)
      create(:template, circle:)

      get settings_templates_url(circle)

      expect(response).to be_successful
    end
  end

  describe "GET old circle templates path" do
    login_super_admin

    it "redirects to settings templates" do
      circle = @admin.circles.first

      get "/#{circle.slug}/templates"

      expect(response).to redirect_to("/settings/#{circle.slug}/templates")
      expect(response).to have_http_status(:moved_permanently)
    end
  end
end
