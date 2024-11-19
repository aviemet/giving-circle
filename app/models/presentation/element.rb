class Presentation::Element < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:name, :template, :data],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  scope :includes_associated, -> { includes([]) }
end
