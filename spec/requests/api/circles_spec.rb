require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Api::Circles", type: :request do
  describe "GET /api/circles/:circle_slug/mock" do
    login_super_admin

    it "returns mock circle data" do
      circle = @admin.circles.first

      get api_circle_mock_path(circle_slug: circle.slug)

      expect(response).to be_successful
      expect(response.parsed_body).to include("id")
    end
  end
end
