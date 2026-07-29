require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Presentations::Interact", type: :request do
  let(:circle) { create(:circle) }
  let(:theme) { create(:theme, circle: circle) }
  let(:presentation) { create(:presentation, theme: theme, active: true) }
  let(:user) { create(:user) }
  let(:membership) { create(:membership, circle: circle, person: user.person) }
  let(:org) { create(:org, circle: circle) }
  let(:interaction) do
    create(
      :presentation_interaction,
      presentation: presentation,
      accepting_responses: true,
      config: InteractionConfigFixtures::ALLOCATION_ROUND,
      interaction_ui_template: create(:interaction_ui_template, :allocation),
    )
  end

  before do
    user.confirm
    create(:presentations_membership, presentation: presentation, membership: membership, funds_cents: 25_000)
    create(:presentations_org, presentation: presentation, org: org)
    interaction
    sign_in user
  end

  describe "GET show" do
    it "renders the interact page with the accepting interaction" do
      get circle_presentation_interact_path(circle, presentation)

      expect(response).to be_successful
      expect(inertia).to render_component("Presentations/Interact/Show")
      expect(inertia.props[:active_interaction]["id"]).to eq(interaction.id)
      expect(inertia.props[:available_funds]["cents"]).to eq(25_000)
    end

    it "exposes presentation membership funds as available_funds" do
      presentation.presentations_memberships.find_by!(membership: membership).update!(funds_cents: 80_000)

      get circle_presentation_interact_path(circle, presentation)

      expect(inertia.props[:available_funds]["cents"]).to eq(80_000)
    end

    it "renders idle props when no interaction is accepting" do
      interaction.close_responses!

      get circle_presentation_interact_path(circle, presentation)

      expect(response).to be_successful
      expect(inertia.props[:active_interaction]).to be_nil
    end

    it "denies access when the presentation is inactive" do
      presentation.update!(active: false)

      get circle_presentation_interact_path(circle, presentation),
        headers: { "HTTP_REFERER" => circle_path(circle) }

      expect(response).to redirect_to(circle_path(circle))
    end

    it "denies access when the user has no presentation membership" do
      other_user = create(:user)
      other_user.confirm
      sign_in other_user

      get circle_presentation_interact_path(circle, presentation),
        headers: { "HTTP_REFERER" => circle_path(circle) }

      expect(response).to redirect_to(circle_path(circle))
    end
  end

  describe "PATCH upsert" do
    it "creates a response for the membership and aggregates allocated totals" do
      expect {
        patch circle_presentation_interact_path(circle, presentation), params: {
          presentation_interaction_response: {
            response_data: {
              allocations: [
                { org_id: org.id, amount_cents: 2_500 },
              ],
            },
          },
        }
      }.to change(Presentation::InteractionResponse, :count).by(1)

      expect(response).to redirect_to(circle_presentation_interact_path(circle, presentation))

      values = PresentationValues::Aggregator.call(presentation)
      expect(values[:allocated_totals]).to contain_exactly(
        {
          org_id: org.id,
          allocated_cents: 2_500,
          currency: "USD",
        },
      )
    end

    it "updates an existing response for the membership" do
      create(
        :presentation_interaction_response,
        presentation_interaction: interaction,
        membership: membership,
        response_data: {
          allocations: [
            { org_id: org.id, amount_cents: 100 },
          ],
        },
      )

      expect {
        patch circle_presentation_interact_path(circle, presentation), params: {
          presentation_interaction_response: {
            response_data: {
              allocations: [
                { org_id: org.id, amount_cents: 900 },
              ],
            },
          },
        }
      }.not_to change(Presentation::InteractionResponse, :count)

      saved = interaction.interaction_responses.find_by(membership_id: membership.id)
      allocation = saved.response_data.with_indifferent_access[:allocations].first
      expect(allocation[:org_id]).to eq(org.id)
      expect(allocation[:amount_cents].to_i).to eq(900)
    end

    it "rejects allocations that exceed available funds" do
      expect {
        patch circle_presentation_interact_path(circle, presentation), params: {
          presentation_interaction_response: {
            response_data: {
              allocations: [
                { org_id: org.id, amount_cents: 50_000 },
              ],
            },
          },
        }
      }.not_to change(Presentation::InteractionResponse, :count)

      expect(response).to redirect_to(circle_presentation_interact_path(circle, presentation))
    end

    it "rejects upsert when no interaction is accepting" do
      interaction.close_responses!

      expect {
        patch circle_presentation_interact_path(circle, presentation), params: {
          presentation_interaction_response: {
            response_data: {
              allocations: [
                { org_id: org.id, amount_cents: 100 },
              ],
            },
          },
        }, headers: { "HTTP_REFERER" => circle_path(circle) }
      }.not_to change(Presentation::InteractionResponse, :count)

      expect(response).to redirect_to(circle_path(circle))
    end
  end

  describe "finalist votes and pledges" do
    it "exposes available_votes for a finalist vote interaction" do
      interaction.update!(accepting_responses: false)
      finalist = create(
        :presentation_interaction,
        presentation: presentation,
        accepting_responses: true,
        interaction_ui_template: create(:interaction_ui_template, :finalist_vote),
        config: InteractionConfigFixtures::FINALIST_VOTE,
      )
      finalist.sync_interaction_memberships!
      finalist.interaction_memberships.find_by!(membership_id: membership.id).update!(
        member_attributes: { "votes" => 12 },
      )

      get circle_presentation_interact_path(circle, presentation)

      expect(inertia.props[:available_votes]).to eq(12)
    end

    it "creates a second pledge response instead of upserting" do
      interaction.update!(accepting_responses: false)
      pledges = create(
        :presentation_interaction,
        presentation: presentation,
        accepting_responses: true,
        interaction_ui_template: create(:interaction_ui_template, :pledges),
        config: InteractionConfigFixtures::PLEDGES,
      )
      create(
        :presentation_interaction_response,
        presentation_interaction: pledges,
        membership: membership,
        response_data: {
          pledges: [{ org_id: org.id, amount_cents: 500 }],
          anonymous: false,
        },
      )

      expect {
        patch circle_presentation_interact_path(circle, presentation), params: {
          presentation_interaction_response: {
            response_data: {
              pledges: [{ org_id: org.id, amount_cents: 750 }],
              anonymous: true,
            },
          },
        }
      }.to change(Presentation::InteractionResponse, :count).by(1)

      expect(pledges.interaction_responses.where(membership_id: membership.id).count).to eq(2)
    end
  end
end
