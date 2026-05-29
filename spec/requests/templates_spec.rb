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

      get circle_template_url(circle, template)

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

      get circle_templates_url(circle)

      expect(response).to be_successful
    end
  end
end
