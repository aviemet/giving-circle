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
class Presentation::InteractionMembership < ApplicationRecord
  self.table_name = "presentation_interaction_memberships"

  belongs_to :presentation_interaction, class_name: "Presentation::Interaction", inverse_of: :interaction_memberships
  belongs_to :membership

  validates :membership_id, uniqueness: { scope: :presentation_interaction_id }

  def votes
    value = member_attributes.with_indifferent_access[:votes]
    return if value.nil?

    value.to_i
  end

  def votes=(value)
    attrs = member_attributes.with_indifferent_access.dup
    if value.nil?
      attrs.delete(:votes)
      attrs.delete("votes")
    else
      attrs[:votes] = value.to_i
    end
    self.member_attributes = attrs
  end
end
