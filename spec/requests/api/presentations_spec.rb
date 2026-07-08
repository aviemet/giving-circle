require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Api::Presentations", type: :request do
  describe "PATCH /api/circles/:circle_slug/presentations/:slug/sync_slides" do
    login_super_admin

    it "syncs slides from the presentation template" do
      circle = @admin.circles.first
      theme = create(:theme, circle:)
      template = create(:template, circle:)
      template_slide = create(:slide, title: "Template Slide")
      template.slides << template_slide
      presentation = create(:presentation, theme:, template:)
      presentation.copy_template_slides
      template_slide.update!(title: "Updated Template Slide")

      patch sync_slides_api_circle_presentation_path(circle_slug: circle.slug, slug: presentation.slug)

      expect(response).to have_http_status(:ok)
      expect(presentation.reload.slides.first.title).to eq("Updated Template Slide")
    end
  end
end
