require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Api::Slides", type: :request do
  describe "POST /api/circles/:circle_slug/presentations/:presentation_slug/slides" do
    login_super_admin

    it "creates a slide for the presentation" do
      circle = @admin.circles.first
      presentation = create(:presentation, theme: create(:theme, circle:))

      expect {
        post api_circle_presentation_slides_path(
          circle_slug: circle.slug,
          presentation_slug: presentation.slug,
        ), params: { slide: { title: "New Slide", data: {} } }
      }.to change(Slide, :count).by(1)

      expect(response).to have_http_status(:created)
    end
  end
end
