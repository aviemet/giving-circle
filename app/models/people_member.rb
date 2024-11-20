class PeopleMember < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:person, :member],
    associated_against: {
      person, member: [],
    },
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify
  belongs_to :person
  belongs_to :member

  scope :includes_associated, -> { includes([:person, :member]) }
end
