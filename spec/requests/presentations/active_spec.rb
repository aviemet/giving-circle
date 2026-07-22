require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Presentations::Actives", type: :request do
  describe "GET /admin" do
    login_super_admin

    it "renders the active presentation admin" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))

      get theme_presentation_controls_path(presentation.circle, presentation.theme, presentation)

      expect(response).to be_successful
    end
  end
end
