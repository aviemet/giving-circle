require "rails_helper"

# == Schema Information
#
# Table name: presentation_interaction_memberships
#
#  id                          :uuid             not null, primary key
#  member_attributes           :jsonb            not null
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#  membership_id               :uuid             not null
#  presentation_interaction_id :uuid             not null
#
# Indexes
#
#  index_interaction_memberships_on_interaction_and_membership  (presentation_interaction_id,membership_id) UNIQUE
#  index_interaction_memberships_on_interaction_id              (presentation_interaction_id)
#  index_interaction_memberships_on_membership_id               (membership_id)
#
# Foreign Keys
#
#  fk_rails_...  (membership_id => memberships.id)
#  fk_rails_...  (presentation_interaction_id => presentation_interactions.id)
#
RSpec.describe Presentation::InteractionMembership do
  let(:presentation) { create(:presentation) }
  let(:membership) { create(:membership, circle: presentation.circle) }

  before do
    create(:presentations_membership, presentation: presentation, membership: membership)
  end

  it "syncs default votes onto interaction memberships on create" do
    interaction = create(
      :presentation_interaction,
      presentation: presentation,
      interaction_ui_template: create(:interaction_ui_template, :finalist_vote),
      config: InteractionConfigFixtures::FINALIST_VOTE,
    )

    row = interaction.interaction_memberships.find_by!(membership_id: membership.id)
    expect(row.votes).to eq(10)
  end

  it "exposes available votes for a membership" do
    interaction = create(
      :presentation_interaction,
      presentation: presentation,
      interaction_ui_template: create(:interaction_ui_template, :finalist_vote),
      config: InteractionConfigFixtures::FINALIST_VOTE,
    )
    row = interaction.interaction_memberships.find_by!(membership_id: membership.id)
    row.update!(member_attributes: { "votes" => 7 })

    expect(interaction.available_votes_for(membership)).to eq(7)
  end
end
