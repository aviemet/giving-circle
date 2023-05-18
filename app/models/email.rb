class Email < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:email],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  tracked
  resourcify


  scope :includes_associated, -> { includes([]) }
end
