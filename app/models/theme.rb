class Theme < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:title, :question, :slug],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  slug :title

  resourcify

  belongs_to :circle
  has_many :presentations
  has_many :themes_orgs
  has_many :orgs, through: :themes_orgs

  scope :includes_associated, -> { includes([:circle, :presentations, :orgs]) }
end
