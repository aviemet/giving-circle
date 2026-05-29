require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Presentations::Slides", type: :request do
  describe "GET /index" do
    login_super_admin

    it "renders the presentation slide deck" do
      presentation = create(:presentation, circle: @admin.circles.first)

      get theme_presentation_slides_url(
        presentation.circle,
        presentation.theme,
        presentation,
      )

      expect(response).to be_successful
    end
  end
end
