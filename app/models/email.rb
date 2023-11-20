class Email < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:email],
    associated_against: {
      contact: [],
    },
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  belongs_to :contact

  scope :includes_associated, -> { includes([:contact]) }
end
