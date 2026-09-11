require "rails_helper"
require_relative "../../../support/devise"

RSpec.describe "Api::Presentations::ElementControls", type: :request do
  login_super_admin

  let(:circle) { @admin.circles.first }
  let(:theme) { create(:theme, circle: circle) }
  let(:presentation) { create(:presentation, theme: theme, active: true) }
  let(:slide) { create(:slide) }

  before do
    presentation.slides << slide
  end

  describe "PATCH update" do
    it "persists an element control override" do
      patch api_circle_presentation_element_controls_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
      ), params: {
        element_control: {
          slide_id: slide.id,
          element_id: "timer-1",
          element_type: "Timer",
          control: "duration",
          value: { minutes: 5, seconds: 30 },
        },
      }, as: :json

      expect(response).to have_http_status(:accepted)
      expect(presentation.reload.element_controls).to eq(
        slide.id => {
          "timer-1" => {
            "Timer" => {
              "duration" => { "minutes" => 5, "seconds" => 30 },
            },
          },
        },
      )
      expect(response.parsed_body["element_controls"]).to eq(presentation.element_controls)
    end

    it "persists a leverage bar visibility override" do
      patch api_circle_presentation_element_controls_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
      ), params: {
        element_control: {
          slide_id: slide.id,
          element_id: "leverage-bar-1",
          element_type: "LeverageBar",
          control: "visibility",
          value: { visible: false },
        },
      }, as: :json

      expect(response).to have_http_status(:accepted)
      expect(presentation.reload.element_controls).to eq(
        slide.id => {
          "leverage-bar-1" => {
            "LeverageBar" => {
              "visibility" => { "visible" => false },
            },
          },
        },
      )
    end

    it "returns unprocessable content when required params are missing" do
      patch api_circle_presentation_element_controls_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
      ), params: {
        element_control: {
          slide_id: slide.id,
          element_id: "timer-1",
        },
      }, as: :json

      expect(response).to have_http_status(:unprocessable_content)
      expect(presentation.reload.element_controls).to eq({})
    end

    it "returns unprocessable content when slide is not on the presentation" do
      other_slide = create(:slide)

      patch api_circle_presentation_element_controls_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
      ), params: {
        element_control: {
          slide_id: other_slide.id,
          element_id: "timer-1",
          element_type: "Timer",
          control: "duration",
          value: { minutes: 1, seconds: 0 },
        },
      }, as: :json

      expect(response).to have_http_status(:unprocessable_content)
      expect(response.parsed_body["errors"]).to eq("slide_id" => ["not found"])
    end
  end
end
