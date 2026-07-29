require "rails_helper"

RSpec.describe PresentationValues::Finalists do
  let(:presentation) { create(:presentation) }
  let!(:org_a) { create(:org, circle: presentation.circle, name: "A Org") }
  let!(:org_b) { create(:org, circle: presentation.circle, name: "B Org") }
  let!(:org_c) { create(:org, circle: presentation.circle, name: "C Org") }

  before do
    create(:presentations_org, presentation: presentation, org: org_a)
    create(:presentations_org, presentation: presentation, org: org_b)
    create(:presentations_org, presentation: presentation, org: org_c)
  end

  it "returns all org ids when no finalist source interaction exists" do
    expect(described_class.call(presentation)).to match_array([org_a.id, org_b.id, org_c.id])
  end

  it "returns all org ids when finalist interaction has no responses" do
    create(
      :presentation_interaction,
      presentation: presentation,
      interaction_ui_template: create(:interaction_ui_template, :finalist_vote),
      config: InteractionConfigFixtures::FINALIST_VOTE,
    )

    expect(described_class.call(presentation)).to match_array([org_a.id, org_b.id, org_c.id])
  end

  it "returns top n orgs by vote totals with stable tie-break" do
    interaction = create(
      :presentation_interaction,
      presentation: presentation,
      interaction_ui_template: create(:interaction_ui_template, :finalist_vote),
      config: InteractionConfigFixtures::FINALIST_VOTE.merge(
        "settings" => { "finalist_count" => 2, "default_votes" => 10 },
      ),
    )
    membership = create(:membership, circle: presentation.circle)
    create(:presentations_membership, presentation: presentation, membership: membership)
    interaction.sync_interaction_memberships!
    create(
      :presentation_interaction_response,
      presentation_interaction: interaction,
      membership: membership,
      response_data: {
        votes: [
          { org_id: org_c.id, amount_cents: 4 },
          { org_id: org_a.id, amount_cents: 4 },
          { org_id: org_b.id, amount_cents: 1 },
        ],
      },
    )

    result = described_class.call(
      presentation,
      org_vote_totals_by_org: {
        org_c.id => 4,
        org_a.id => 4,
        org_b.id => 1,
      },
    )

    expect(result).to eq([org_a.id, org_c.id].sort)
  end
end
