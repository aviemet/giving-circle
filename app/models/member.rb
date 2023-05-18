class Member < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:first_name, :last_name, :number],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  tracked
  resourcify


  scope :includes_associated, -> { includes([]) }
end
