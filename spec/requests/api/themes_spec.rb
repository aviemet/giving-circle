require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Api::Themes", type: :request do
  describe "POST /api/circles/:circle_slug/themes" do
    login_super_admin

    it "responds successfully" do
      circle = @admin.circles.first

      post api_circle_themes_path(circle_slug: circle.slug)

      expect(response).to have_http_status(:no_content)
    end
  end
end
