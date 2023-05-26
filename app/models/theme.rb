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

  slug :title

  resourcify

  scope :includes_associated, -> { includes([]) }

  has_many :circles_themes
  has_many :circles, through: :circles_themes

  has_many :members_themes
  has_many :members, through: :members_themes
end
