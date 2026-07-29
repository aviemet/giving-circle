require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Presentations::Slides", type: :request do
  login_super_admin

  describe "GET /index" do
    it "renders the presentation slide deck" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))

      get theme_presentation_slides_url(
        presentation.circle,
        presentation.theme,
        presentation,
      )

      expect(response).to be_successful
      expect(inertia).to render_component("Presentations/Slides/Index")
    end
  end

  describe "GET /show" do
    it "renders the slide" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))
      slide = create(:slide, title: "Intro")
      presentation.slides << slide

      get theme_presentation_slide_url(
        presentation.circle,
        presentation.theme,
        presentation,
        slide,
      )

      expect(response).to be_successful
      expect(inertia).to render_component("Presentations/Slides/Show")
    end
  end

  describe "GET /new" do
    it "renders the new slide form" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))

      get new_theme_presentation_slide_url(
        presentation.circle,
        presentation.theme,
        presentation,
      )

      expect(response).to be_successful
      expect(inertia).to render_component("Presentations/Slides/New")
    end
  end

  describe "GET /edit" do
    it "renders the slide editor" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))
      slide = create(:slide, title: "Intro")
      presentation.slides << slide

      get edit_theme_presentation_slide_url(
        presentation.circle,
        presentation.theme,
        presentation,
        slide,
      )

      expect(response).to be_successful
      expect(inertia).to render_component("Presentations/Slides/Edit")
    end

    it "returns not found for a positional index slug" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))
      slide = create(:slide, title: "Intro")
      presentation.slides << slide

      get edit_theme_presentation_slide_url(
        presentation.circle,
        presentation.theme,
        presentation,
        "0",
      )

      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST /create" do
    it "creates a slide for the presentation" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))

      expect {
        post theme_presentation_slides_url(
          presentation.circle,
          presentation.theme,
          presentation,
        ), params: { slide: { title: "New Slide", data: {} } }
      }.to change(Slide, :count).by(1)

      slide = Slide.last
      expect(presentation.slides.reload).to include(slide)
      expect(response).to redirect_to(
        theme_presentation_slide_url(presentation.circle, presentation.theme, presentation, slide),
      )
    end

    it "redirects with errors when save fails" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))
      allow_any_instance_of(Slide).to receive(:save).and_return(false)
      allow_any_instance_of(Slide).to receive_message_chain(:errors).and_return(
        ActiveModel::Errors.new(Slide.new).tap { |errors| errors.add(:title, "invalid") },
      )

      post theme_presentation_slides_url(
        presentation.circle,
        presentation.theme,
        presentation,
      ), params: { slide: { title: "New Slide", data: {} } }

      expect(response).to redirect_to(
        new_theme_presentation_slide_url(presentation.circle, presentation.theme, presentation),
      )
    end
  end

  describe "PATCH /update" do
    it "updates the slide" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))
      slide = create(:slide, title: "Intro")
      presentation.slides << slide

      patch theme_presentation_slide_url(
        presentation.circle,
        presentation.theme,
        presentation,
        slide,
      ), params: { slide: { title: "Updated Intro", data: { "root" => {} } } }

      expect(slide.reload.title).to eq("Updated Intro")
      expect(response).to redirect_to(
        theme_presentation_slide_url(presentation.circle, presentation.theme, presentation, slide),
      )
    end

    it "redirects with errors when update fails" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))
      slide = create(:slide, title: "Intro")
      presentation.slides << slide
      allow_any_instance_of(Slide).to receive(:update).and_return(false)
      allow_any_instance_of(Slide).to receive(:errors).and_return(
        ActiveModel::Errors.new(slide).tap { |errors| errors.add(:title, "invalid") },
      )

      patch theme_presentation_slide_url(
        presentation.circle,
        presentation.theme,
        presentation,
        slide,
      ), params: { slide: { title: "Updated Intro", data: { "root" => {} } } }

      expect(response).to redirect_to(
        edit_theme_presentation_slide_url(presentation.circle, presentation.theme, presentation, slide),
      )
    end
  end

  describe "DELETE /destroy" do
    it "destroys the slide and redirects to the deck" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))
      slide = create(:slide, title: "Intro")
      presentation.slides << slide

      expect {
        delete theme_presentation_slide_url(
          presentation.circle,
          presentation.theme,
          presentation,
          slide,
        )
      }.to change(Slide, :count).by(-1)

      expect(response).to redirect_to(
        theme_presentation_slides_url(presentation.circle, presentation.theme, presentation),
      )
    end
  end
end
