require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Presentations::Interactions", type: :request do
  login_super_admin

  let(:presentation) { create(:presentation, theme: create(:theme, circle: @admin.circles.first)) }
  let(:circle) { presentation.circle }
  let(:theme) { presentation.theme }

  describe "GET index" do
    it "is successful" do
      get theme_presentation_interactions_path(circle, theme, presentation)

      expect(response).to be_successful
    end
  end

  describe "GET new" do
    it "is successful" do
      get new_theme_presentation_interaction_path(circle, theme, presentation)

      expect(response).to be_successful
    end
  end

  describe "POST create" do
    it "creates an interaction" do
      expect {
        post theme_presentation_interactions_path(circle, theme, presentation), params: {
          presentation_interaction: {
            name: "Allocation Round",
            trigger_type: "manual",
            trigger_conditions: {},
            config: InteractionConfigFixtures::ALLOCATION_ROUND,
            results: {},
          },
        }
      }.to change(Presentation::Interaction, :count).by(1)

      expect(response).to redirect_to(theme_presentation_interaction_path(
        circle,
        theme,
        presentation,
        Presentation::Interaction.last,
      ))
    end

    it "creates an interaction from form params without explicit config" do
      expect {
        post theme_presentation_interactions_path(circle, theme, presentation), params: {
          presentation_interaction: {
            name: "Allocation Round",
            trigger_type: "manual",
            trigger_conditions: {},
            results: {},
          },
        }
      }.to change(Presentation::Interaction, :count).by(1)

      interaction = Presentation::Interaction.last
      expect(interaction.config).to eq(Presentation::Interaction::BLANK_CONFIG)
      expect(response).to redirect_to(theme_presentation_interaction_path(
        circle,
        theme,
        presentation,
        interaction,
      ))
    end

    it "returns validation errors for incompatible output config" do
      expect {
        post theme_presentation_interactions_path(circle, theme, presentation), params: {
          presentation_interaction: {
            name: "Invalid Round",
            trigger_type: "manual",
            trigger_conditions: {},
            results: {},
            config: {
              "fields" => [
                { "key" => "amount", "type" => "number", "label" => "Amount", "options" => { "min" => 1, "max" => 10 } },
              ],
              "outputs" => [
                { "metric" => "allocated_totals", "source_field" => "amount", "reducer" => "sum_by_org" },
              ],
            },
          },
        }
      }.not_to change(Presentation::Interaction, :count)

      expect(response).to redirect_to(new_theme_presentation_interaction_path(circle, theme, presentation))
    end

    it "returns validation errors for blank trigger_type" do
      expect {
        post theme_presentation_interactions_path(circle, theme, presentation), params: {
          presentation_interaction: {
            name: "a",
            trigger_type: "",
            config: { "fields" => [], "outputs" => [] },
          },
        }
      }.not_to change(Presentation::Interaction, :count)

      expect(response).to redirect_to(new_theme_presentation_interaction_path(circle, theme, presentation))
    end
  end

  describe "PATCH update" do
    it "updates an interaction" do
      interaction = create(:presentation_interaction, presentation: presentation, name: "Original")

      patch theme_presentation_interaction_path(circle, theme, presentation, interaction), params: {
        presentation_interaction: {
          name: "Renamed Round",
        },
      }

      interaction.reload
      expect(response).to redirect_to(theme_presentation_interaction_path(circle, theme, presentation, interaction))
      expect(interaction.name).to eq("Renamed Round")
    end

    it "returns validation errors for invalid update params" do
      interaction = create(:presentation_interaction, presentation: presentation, name: "Original")

      patch theme_presentation_interaction_path(circle, theme, presentation, interaction), params: {
        presentation_interaction: {
          name: "Original",
          config: {
            "fields" => [
              { "key" => "amount", "type" => "number", "label" => "Amount" },
            ],
            "outputs" => [
              { "metric" => "allocated_totals", "source_field" => "amount", "reducer" => "sum_by_org" },
            ],
          },
        },
      }

      expect(response).to redirect_to(edit_theme_presentation_interaction_path(circle, theme, presentation, interaction))
      expect(interaction.reload.config).to eq(InteractionConfigFixtures::ALLOCATION_ROUND)
    end
  end

  describe "DELETE destroy" do
    it "destroys an interaction" do
      interaction = create(:presentation_interaction, presentation: presentation)

      expect {
        delete theme_presentation_interaction_path(circle, theme, presentation, interaction)
      }.to change(Presentation::Interaction, :count).by(-1)

      expect(response).to redirect_to(theme_presentation_interactions_path(circle, theme, presentation))
    end
  end

  describe "POST open_responses" do
    it "opens the interaction for responses" do
      interaction = create(
        :presentation_interaction,
        presentation: presentation,
        accepting_responses: false,
      )

      post open_responses_theme_presentation_interaction_path(circle, theme, presentation, interaction)

      expect(response).to redirect_to(
        theme_presentation_interaction_path(circle, theme, presentation, interaction),
      )
      expect(interaction.reload.accepting_responses).to be(true)
    end
  end

  describe "POST close_responses" do
    it "closes the interaction for responses" do
      interaction = create(
        :presentation_interaction,
        presentation: presentation,
        accepting_responses: true,
      )

      post close_responses_theme_presentation_interaction_path(circle, theme, presentation, interaction)

      expect(response).to redirect_to(
        theme_presentation_interaction_path(circle, theme, presentation, interaction),
      )
      expect(interaction.reload.accepting_responses).to be(false)
    end
  end
end
