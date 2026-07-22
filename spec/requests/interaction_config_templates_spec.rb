require "rails_helper"
require_relative "../support/devise"

RSpec.describe "InteractionConfigTemplates", type: :request do
  login_super_admin

  let(:circle) { create(:circle) }

  describe "GET index" do
    it "is successful" do
      get circle_interaction_templates_path(circle)

      expect(response).to be_successful
      expect(inertia).to render_component("InteractionConfigTemplates/Index")
    end
  end

  describe "POST create" do
    it "creates a template" do
      expect {
        post circle_interaction_templates_path(circle), params: {
          interaction_config_template: {
            name: "Allocation round",
            config: InteractionConfigFixtures::ALLOCATION_ROUND,
          },
        }
      }.to change(InteractionConfigTemplate, :count).by(1)

      expect(response).to redirect_to(edit_circle_interaction_template_path(
        circle,
        InteractionConfigTemplate.last,
      ))
    end

    it "redirects back with validation errors" do
      expect {
        post circle_interaction_templates_path(circle), params: {
          interaction_config_template: {
            name: "",
            config: InteractionConfigFixtures::ALLOCATION_ROUND,
          },
        }
      }.not_to change(InteractionConfigTemplate, :count)

      expect(response).to redirect_to(new_circle_interaction_template_path(circle))
    end
  end
end
