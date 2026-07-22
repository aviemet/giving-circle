require "rails_helper"

RSpec.describe Presentation::InteractionResponse::DataValidator do
  let(:interaction) { create(:presentation_interaction) }
  let(:membership) { create(:membership, circle: interaction.presentation.circle) }

  before do
    interaction.presentation.memberships << membership
  end

  it "accepts valid org money map response data" do
    response = build(
      :presentation_interaction_response,
      presentation_interaction: interaction,
      membership: membership,
      response_data: {
        allocations: [
          { org_id: SecureRandom.uuid, amount_cents: 500 },
        ],
      },
    )

    expect(response).to be_valid
  end

  it "rejects unknown response keys" do
    response = build(
      :presentation_interaction_response,
      presentation_interaction: interaction,
      membership: membership,
      response_data: {
        unknown_field: "value",
      },
    )

    expect(response).not_to be_valid
    expect(response.errors[:response_data]).to be_present
  end
end
