require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Presentations::InteractionResponses", type: :request do
  login_super_admin

  let(:presentation) { create(:presentation, theme: create(:theme, circle: @admin.circles.first)) }
  let(:circle) { presentation.circle }
  let(:theme) { presentation.theme }
  let(:interaction) { create(:presentation_interaction, presentation: presentation) }
  let(:org) { create(:org, circle: circle) }
  let(:membership) { create(:membership, circle: circle) }

  describe "GET index" do
    let(:membership_without_response) { create(:membership, circle: circle) }

    before do
      create(:presentations_org, presentation: presentation, org: org)
      create(:presentations_membership, presentation: presentation, membership: membership)
      create(:presentations_membership, presentation: presentation, membership: membership_without_response)
    end

    it "lists only saved responses" do
      response_record = create(
        :presentation_interaction_response,
        presentation_interaction: interaction,
        membership: membership,
        response_data: {
          allocations: [
            { org_id: org.id, amount_cents: 500 },
          ],
        },
      )

      get theme_presentation_interaction_responses_path(circle, theme, presentation, interaction)

      expect(response).to be_successful
      expect(inertia).to render_component("Presentations/InteractionResponses/Index")
      expect(inertia.props).not_to have_key(:memberships)
      expect(inertia.props[:presentation_interaction_responses].pluck("id")).to eq([response_record.id])
    end
  end

  describe "POST create" do
    before do
      create(:presentations_org, presentation: presentation, org: org)
      create(:presentations_membership, presentation: presentation, membership: membership)
    end

    it "creates a new response on each submission" do
      expect {
        post theme_presentation_interaction_responses_path(circle, theme, presentation, interaction), params: {
          presentation_interaction_response: {
            membership_id: membership.id,
            response_data: {
              allocations: [
                { org_id: org.id, amount_cents: 500 },
              ],
            },
          },
        }
      }.to change(Presentation::InteractionResponse, :count).by(1)

      expect(response).to redirect_to(theme_presentation_interaction_response_path(
        circle,
        theme,
        presentation,
        interaction,
        Presentation::InteractionResponse.last,
      ))

      expect {
        post theme_presentation_interaction_responses_path(circle, theme, presentation, interaction), params: {
          presentation_interaction_response: {
            membership_id: membership.id,
            response_data: {
              allocations: [
                { org_id: org.id, amount_cents: 900 },
              ],
            },
          },
        }
      }.to change(Presentation::InteractionResponse, :count).by(1)

      expect(Presentation::InteractionResponse.count).to eq(2)
      expect(Presentation::InteractionResponse.last.response_data["allocations"].first["amount_cents"].to_i).to eq(900)
    end
  end
end
