require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Api::Spotlights", type: :request do
  describe "GET /api/circles/:circle_slug/spotlights" do
    login_super_admin

    it "returns circle-scoped spotlight data" do
      circle = @admin.circles.first
      org = create(:org, circle:, name: "Spotlight Org")
      theme = create(:theme, circle:, name: "Spotlight Theme")
      membership = create(:membership, circle:, name: "Spotlight Membership")
      template = create(:template, circle:, name: "Spotlight Template")
      presentation = create(:presentation, theme:, name: "Spotlight Presentation")

      get api_circle_spotlights_path(circle_slug: circle.slug)

      expect(response).to be_successful

      body = response.parsed_body
      expect(body["orgs"].pluck("name")).to include(org.name)
      expect(body["themes"].pluck("name")).to include(theme.name)
      expect(body["memberships"].pluck("name")).to include(membership.name)
      expect(body["templates"].pluck("name")).to include(template.name)
      expect(body["presentations"].pluck("name")).to include(presentation.name)
    end
  end
end
