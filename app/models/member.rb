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

  resourcify

  has_many :members_themes
  has_many :themes, through: :members_themes

  scope :includes_associated, -> { includes([]) }
end
