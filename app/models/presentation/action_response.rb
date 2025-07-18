# == Schema Information
#
# Table name: presentation_action_responses
#
#  id                     :uuid             not null, primary key
#  response_data          :jsonb
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  membership_id          :uuid             not null
#  presentation_action_id :uuid             not null
#
# Indexes
#
#  index_presentation_action_responses_on_membership_id           (membership_id)
#  index_presentation_action_responses_on_presentation_action_id  (presentation_action_id)
#
# Foreign Keys
#
#  fk_rails_...  (membership_id => memberships.id)
#  fk_rails_...  (presentation_action_id => presentation_actions.id)
#
class Presentation::ActionResponse < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:presentation_action, :membership, :response_data],
    associated_against: {
      presentation_action: [],
      membership: [],
    },
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify
  belongs_to :presentation_action
  belongs_to :membership

  scope :includes_associated, -> { includes([:presentation_action, :membership]) }
end
