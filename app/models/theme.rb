class Theme < ApplicationRecord
  include PgSearch::Model
  include BooleanTimestamp

  enum :status, { draft: 0, current: 1, past: 2, future: 3 }
  boolean_timestamp :published

  pg_search_scope(
    :search,
    against: [:title, :slug],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  slug :title

  resourcify

  belongs_to :circle
  has_many :presentations
  has_many :themes_org
  has_many :orgs, through: :themes_org

  scope :includes_associated, -> { includes([:circle, :presentations, :orgs]) }
end
