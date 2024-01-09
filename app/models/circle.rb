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

  has_many :themes, dependent: :nullify
  has_many :presentations, through: :themes
  has_many :circles_member, dependent: :destroy
  has_many :members, through: :circles_member

  scope :includes_associated, -> { includes([:themes, :presentations, :members]) }
end
