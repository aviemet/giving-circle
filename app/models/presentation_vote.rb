# == Schema Information
#
# Table name: presentation_votes
#
#  id         :uuid             not null, primary key
#  name       :string
#  type       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
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
