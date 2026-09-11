require "rails_helper"
require_relative "../support/devise"

RSpec.describe "InteractionConfigTemplates", type: :request do
  login_super_admin

  describe "GET index" do
    it "is successful" do
      circle = @admin.circles.first

      get settings_interaction_templates_path(circle)

      expect(response).to be_successful
      expect(inertia).to render_component("InteractionConfigTemplates/Index")
    end
  end

  describe "GET new" do
    it "renders the new form" do
      circle = @admin.circles.first

      get new_settings_interaction_template_path(circle)

      expect(response).to be_successful
      expect(inertia).to render_component("InteractionConfigTemplates/New")
    end
  end

  describe "GET edit" do
    it "renders the edit form" do
      circle = @admin.circles.first
      template = create(:interaction_config_template, circle:)

      get edit_settings_interaction_template_path(circle, template)

      expect(response).to be_successful
      expect(inertia).to render_component("InteractionConfigTemplates/Edit")
    end
  end

  describe "POST create" do
    it "creates a template" do
      circle = @admin.circles.first

      expect {
        post settings_interaction_templates_path(circle), params: {
          interaction_config_template: {
            name: "Allocation round",
            config: InteractionConfigFixtures::ALLOCATION_ROUND,
          },
        }
      }.to change(InteractionConfigTemplate, :count).by(1)

      expect(response).to redirect_to(edit_settings_interaction_template_path(
        circle,
        InteractionConfigTemplate.last,
      ))
    end

    it "redirects back with validation errors" do
      circle = @admin.circles.first

      expect {
        post settings_interaction_templates_path(circle), params: {
          interaction_config_template: {
            name: "",
            config: InteractionConfigFixtures::ALLOCATION_ROUND,
          },
        }
      }.not_to change(InteractionConfigTemplate, :count)

      expect(response).to redirect_to(new_settings_interaction_template_path(circle))
    end
  end

  describe "PATCH update" do
    it "updates the template" do
      circle = @admin.circles.first
      template = create(:interaction_config_template, circle:, name: "Original")

      patch settings_interaction_template_path(circle, template), params: {
        interaction_config_template: {
          name: "Updated round",
          config: InteractionConfigFixtures::ALLOCATION_ROUND,
        },
      }

      expect(template.reload.name).to eq("Updated round")
      expect(response).to redirect_to(edit_settings_interaction_template_path(circle, template))
    end

    it "redirects back with validation errors" do
      circle = @admin.circles.first
      template = create(:interaction_config_template, circle:, name: "Original")

      patch settings_interaction_template_path(circle, template), params: {
        interaction_config_template: {
          name: "",
          config: InteractionConfigFixtures::ALLOCATION_ROUND,
        },
      }

      expect(template.reload.name).to eq("Original")
      expect(response).to be_redirect
      expect(response.headers["Location"]).to include("/interaction_templates/")
      expect(response.headers["Location"]).to end_with("/edit")
    end

    it "saves member_ui without leaving the editor" do
      circle = @admin.circles.first
      template = create(
        :interaction_config_template,
        circle:,
        member_ui: Interactions::MemberUiPresets::ALLOCATION,
      )
      next_member_ui = Interactions::MemberUiPresets::PLEDGES

      patch settings_interaction_template_path(circle, template), params: {
        interaction_config_template: {
          member_ui: next_member_ui,
        },
      }

      expect(response).to have_http_status(:ok)
      expect(template.reload.member_ui.dig("root", "props", "title")).to eq("Pledges")
    end
  end

  describe "DELETE destroy" do
    it "destroys the template and redirects to index" do
      circle = @admin.circles.first
      template = create(:interaction_config_template, circle:)

      expect {
        delete settings_interaction_template_path(circle, template)
      }.to change(InteractionConfigTemplate, :count).by(-1)

      expect(response).to redirect_to(settings_interaction_templates_path(circle))
    end
  end
end
