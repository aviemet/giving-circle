# == Schema Information
#
# Table name: presentation_interaction_responses
#
#  id                          :uuid             not null, primary key
#  response_data               :jsonb
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#  membership_id               :uuid             not null
#  presentation_interaction_id :uuid             not null
#
# Indexes
#
#  idx_on_presentation_interaction_id_d5003055ab              (presentation_interaction_id)
#  index_presentation_interaction_responses_on_membership_id  (membership_id)
#
# Foreign Keys
#
#  fk_rails_...  (membership_id => memberships.id)
#  fk_rails_...  (presentation_interaction_id => presentation_interactions.id)
#
class Presentation::InteractionResponse < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:presentation_interaction, :membership, :response_data],
    associated_against: {
      presentation_interaction: [],
      membership: [],
    },
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify
  belongs_to :presentation_interaction
  belongs_to :membership

  scope :includes_associated, -> { includes([:presentation_interaction, :membership]) }
end
