require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Api::PresentationElements", type: :request do
  login_super_admin

  describe "GET /api/presentation_elements/templates" do
    it "returns only template elements ordered by name" do
      create(:presentation_element, name: "Zebra", template: false)
      create(:presentation_element, name: "Banner", template: true)
      create(:presentation_element, name: "Agenda", template: true)

      get api_presentation_element_templates_path

      expect(response).to be_successful
      payload = response.parsed_body
      names = payload.map { |element| element.fetch("name") }
      expect(names).to include("Agenda", "Banner")
      expect(names).not_to include("Zebra")
      expect(names).to eq(names.sort)
    end
  end
end
