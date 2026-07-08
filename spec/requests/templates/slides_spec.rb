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

      get circle_templates_edit_slide_path(circle, template, slide)

      expect(response).to be_successful
    end
  end
end
