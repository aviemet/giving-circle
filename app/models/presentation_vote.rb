# == Schema Information
#
# Table name: presentation_votes
#
#  id              :uuid             not null, primary key
#  name            :string
#  vote_type       :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  presentation_id :uuid
#
# Indexes
#
#  index_presentation_votes_on_presentation_id  (presentation_id)
#
# Foreign Keys
#
#  fk_rails_...  (presentation_id => presentations.id)
#
class PresentationVote < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:name, :type],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  scope :includes_associated, -> { includes([]) }
end
