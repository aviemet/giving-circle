class Theme < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:title, :question, :quarter, :slug],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  tracked
  resourcify

  scope :includes_associated, -> { includes([]) }
end
