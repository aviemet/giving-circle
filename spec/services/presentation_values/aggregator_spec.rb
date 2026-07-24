require "rails_helper"

RSpec.describe PresentationValues::Aggregator do
  let(:presentation) { create(:presentation) }
  let(:org) { create(:org, circle: presentation.circle) }
  let(:membership) { create(:membership, circle: presentation.circle) }

  before do
    create(:presentations_org, presentation: presentation, org: org)
    create(:presentations_membership, presentation: presentation, membership: membership)
  end

  let(:interaction) { create(:presentation_interaction, presentation: presentation) }

  it "returns zero allocated totals for orgs without responses" do
    interaction

    values = described_class.call(presentation)

    expect(values[:allocated_totals]).to contain_exactly(
      {
        org_id: org.id,
        allocated_cents: 0,
        currency: "USD",
      },
    )
  end

  it "returns empty allocated totals when presentation has no allocation outputs" do
    create(
      :presentation_interaction,
      presentation: presentation,
      config: { "fields" => [], "outputs" => [] },
    )

    values = described_class.call(presentation.reload)

    expect(values[:allocated_totals]).to eq([])
  end

  it "sums allocation response amounts per org via config outputs" do
    create(
      :presentation_interaction_response,
      presentation_interaction: interaction,
      membership: membership,
      response_data: {
        allocations: [
          { org_id: org.id, amount_cents: 1_500 },
        ],
      },
    )

    values = described_class.call(presentation)

    expect(values[:allocated_totals]).to contain_exactly(
      {
        org_id: org.id,
        allocated_cents: 1_500,
        currency: "USD",
      },
    )
  end

  it "includes org_vote_totals and finalist_org_ids for finalist vote responses" do
    finalist = create(
      :presentation_interaction,
      presentation: presentation,
      interaction_ui_template: create(:interaction_ui_template, :finalist_vote),
      config: InteractionConfigFixtures::FINALIST_VOTE,
    )
    finalist.sync_interaction_memberships!
    create(
      :presentation_interaction_response,
      presentation_interaction: finalist,
      membership: membership,
      response_data: {
        votes: [
          { org_id: org.id, amount_cents: 4 },
        ],
      },
    )

    values = described_class.call(presentation.reload)

    expect(values[:org_vote_totals]).to contain_exactly(
      { org_id: org.id, votes: 4 },
    )
    expect(values[:finalist_org_ids]).to eq([org.id])
    expect(values[:allocated_totals]).to eq([])
  end
end
