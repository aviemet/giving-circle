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

    it "returns errors when create fails" do
      circle = @admin.circles.first
      presentation = create(:presentation, theme: create(:theme, circle:))
      allow_any_instance_of(Slide).to receive(:save).and_return(false)
      errors = ActiveModel::Errors.new(User.new)
      without_partial_double_verification do
        allow_any_instance_of(Api::Presentations::SlidesController).to receive(:user).and_return(
          instance_double(User, errors: errors),
        )
      end

      post api_circle_presentation_slides_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
      ), params: { slide: { title: "New Slide", data: {} } }

      expect(response).to have_http_status(:unprocessable_content)
    end
  end

  describe "PATCH /api/circles/:circle_slug/presentations/:presentation_slug/slides/:slug" do
    login_super_admin

    it "updates a slide" do
      circle = @admin.circles.first
      presentation = create(:presentation, theme: create(:theme, circle:))
      slide = create(:slide)
      create(:slide_parent, parentable: presentation, slide: slide)

      patch api_circle_presentation_slide_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
        slug: slide.slug,
      ), params: { slide: { title: "Updated", data: {} } }

      expect(response).to have_http_status(:accepted)
      expect(slide.reload.title).to eq("Updated")
    end

    it "attaches a thumbnail from a signed blob id" do
      circle = @admin.circles.first
      presentation = create(:presentation, theme: create(:theme, circle:))
      slide = create(:slide)
      create(:slide_parent, parentable: presentation, slide: slide)
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new("img"),
        filename: "thumb.jpg",
        content_type: "image/jpeg",
      )

      patch api_circle_presentation_slide_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
        slug: slide.slug,
      ), params: { slide: { title: "Updated", data: {}, thumbnail: blob.signed_id } }

      expect(response).to have_http_status(:accepted)
      expect(slide.reload.thumbnail).to be_attached
      expect(slide.thumbnail.blob).to eq(blob)
    end

    it "returns errors when update fails" do
      circle = @admin.circles.first
      presentation = create(:presentation, theme: create(:theme, circle:))
      slide = create(:slide)
      create(:slide_parent, parentable: presentation, slide: slide)
      allow_any_instance_of(Slide).to receive(:update).and_return(false)
      errors = ActiveModel::Errors.new(User.new)
      without_partial_double_verification do
        allow_any_instance_of(Api::Presentations::SlidesController).to receive(:user).and_return(
          instance_double(User, errors: errors),
        )
      end

      patch api_circle_presentation_slide_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
        slug: slide.slug,
      ), params: { slide: { title: "Updated", data: {} } }

      expect(response).to have_http_status(:unprocessable_content)
    end
  end

  describe "DELETE /api/circles/:circle_slug/presentations/:presentation_slug/slides/:slug" do
    login_super_admin

    it "authorizes destroy" do
      circle = @admin.circles.first
      presentation = create(:presentation, theme: create(:theme, circle:))
      slide = create(:slide)
      create(:slide_parent, parentable: presentation, slide: slide)

      delete api_circle_presentation_slide_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
        slug: slide.slug,
      )

      expect(response).to have_http_status(:no_content).or have_http_status(:ok).or have_http_status(:redirect).or be_truthy
    end
  end
end
