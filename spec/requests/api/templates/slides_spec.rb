require "rails_helper"
require_relative "../../../support/devise"

RSpec.describe "Api::Templates::Slides", type: :request do
  login_super_admin

  describe "POST /api/circles/:circle_slug/templates/:template_slug/slides" do
    it "creates a slide for the template" do
      circle = @admin.circles.first
      template = create(:template, circle:)

      expect {
        post api_circle_template_slides_path(
          circle_slug: circle.slug,
          template_slug: template.slug,
        ), params: { slide: { title: "New Slide", data: {} } }
      }.to change(Slide, :count).by(1)

      expect(response).to have_http_status(:created)
      expect(template.slides.reload).to include(Slide.last)
      expect(Slide.last.title).to eq("New Slide")
    end
  end

  describe "PATCH /api/circles/:circle_slug/templates/:template_slug/slides/:slug" do
    it "updates the template slide" do
      circle = @admin.circles.first
      template = create(:template, circle:)
      slide = create(:slide, title: "Intro")
      template.slides << slide

      patch api_circle_template_slide_path(
        circle_slug: circle.slug,
        template_slug: template.slug,
        slug: slide.slug,
      ), params: { slide: { title: "Updated", data: { "root" => {} } } }

      expect(response).to have_http_status(:accepted)
      expect(slide.reload.title).to eq("Updated")
    end
  end

  describe "DELETE /api/circles/:circle_slug/templates/:template_slug/slides/:slug" do
    it "authorizes destroy for the template slide" do
      circle = @admin.circles.first
      template = create(:template, circle:)
      slide = create(:slide, title: "Intro")
      template.slides << slide

      delete api_circle_template_slide_path(
        circle_slug: circle.slug,
        template_slug: template.slug,
        slug: slide.slug,
      )

      expect(response).to be_successful
    end
  end
end
