require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Templates::Slides", type: :request do
  describe "GET /edit" do
    login_super_admin

    it "renders the slide editor" do
      circle = @admin.circles.first
      template = create(:template, circle:)
      slide = create(:slide, title: "Intro")
      template.slides << slide

      get settings_templates_edit_slide_path(circle, template, slide)

      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    login_super_admin

    it "creates a slide and redirects to edit" do
      circle = @admin.circles.first
      template = create(:template, circle:)

      expect {
        post settings_templates_create_slide_path(circle, template), params: {
          slide: { title: "Deck slide", data: {} },
        }
      }.to change(Slide, :count).by(1)

      slide = Slide.last
      expect(response).to redirect_to(settings_templates_edit_slide_path(circle, template, slide))
    end

    it "redirects with errors when save fails" do
      circle = @admin.circles.first
      template = create(:template, circle:)
      allow_any_instance_of(Slide).to receive(:save) do |record|
        record.slug = "failed-slide"
        false
      end
      errors = ActiveModel::Errors.new(Slide.new)
      errors.add(:title, "invalid")
      allow_any_instance_of(Slide).to receive(:errors).and_return(errors)

      post settings_templates_create_slide_path(circle, template), params: {
        slide: { title: "Deck slide", data: {} },
      }

      expect(response).to redirect_to(
        settings_templates_edit_slide_path(circle, template, "failed-slide"),
      )
    end
  end
end
