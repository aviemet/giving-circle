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
FactoryBot.define do
  factory :presentation_interaction_membership, class: "Presentation::InteractionMembership" do
    presentation_interaction
    membership
    member_attributes { { "votes" => 10 } }
  end
end
