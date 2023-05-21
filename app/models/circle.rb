class Circle < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:name],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  slug :name

  resourcify

  has_many :circles_themes
  has_many :themes, through: :circles_themes

  has_many :users_circles
  has_many :users, through: :users_circles

  scope :includes_associated, -> { includes([:themes, :users]) }
end
