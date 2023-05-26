class Contact < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:contactable],
    associated_against: {
      contactable: [],
    },
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  belongs_to :contactable, polymorphic: true

  scope :includes_associated, -> { includes([:contactable]) }
end
