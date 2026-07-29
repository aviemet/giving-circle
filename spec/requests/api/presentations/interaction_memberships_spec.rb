require "rails_helper"
require_relative "../../../support/devise"

RSpec.describe "Api::Presentations::InteractionMemberships", type: :request do
  login_super_admin

  describe "PATCH update" do
    it "updates votes on an interaction membership" do
      circle = @admin.circles.first
      presentation = create(:presentation, theme: create(:theme, circle: circle), active: true)
      membership = create(:membership, circle: circle)
      create(:presentations_membership, presentation: presentation, membership: membership)
      interaction = create(
        :presentation_interaction,
        presentation: presentation,
        interaction_ui_template: create(:interaction_ui_template, :finalist_vote),
        config: InteractionConfigFixtures::FINALIST_VOTE,
      )
      interaction_membership = interaction.interaction_memberships.find_by!(membership_id: membership.id)

      patch api_circle_presentation_interaction_membership_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
        interaction_slug: interaction.slug,
        id: interaction_membership.id,
      ), params: {
        presentation_interaction_membership: { votes: 7 },
      }

      expect(response).to have_http_status(:accepted)
      expect(interaction_membership.reload.votes).to eq(7)
      expect(response.parsed_body["membership"]).to include(
        "id" => interaction_membership.id,
        "membership_id" => membership.id,
        "votes" => 7,
      )
    end

    it "returns unprocessable content when votes is missing" do
      circle = @admin.circles.first
      presentation = create(:presentation, theme: create(:theme, circle: circle), active: true)
      membership = create(:membership, circle: circle)
      create(:presentations_membership, presentation: presentation, membership: membership)
      interaction = create(
        :presentation_interaction,
        presentation: presentation,
        interaction_ui_template: create(:interaction_ui_template, :finalist_vote),
        config: InteractionConfigFixtures::FINALIST_VOTE,
      )
      interaction_membership = interaction.interaction_memberships.find_by!(membership_id: membership.id)

      patch api_circle_presentation_interaction_membership_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
        interaction_slug: interaction.slug,
        id: interaction_membership.id,
      ), params: {
        presentation_interaction_membership: { votes: nil },
      }

      expect(response).to have_http_status(:unprocessable_content)
      expect(response.parsed_body["errors"]).to eq("votes" => ["is required"])
      expect(interaction_membership.reload.votes).to eq(10)
    end
  end
end
