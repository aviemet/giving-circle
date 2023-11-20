class Org < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:name, :slug, :description],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  has_many :presentations_orgs
  has_many :presentations, through: :presentations_orgs

  scope :includes_associated, -> { includes([:presentations]) }
end
