class Presentation < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:theme, :name],
    associated_against: {
      theme: [],
    },
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  belongs_to :theme
  has_many :presentations_members
  has_many :members, through: :presentations_members
  has_many :presentations_orgs
  has_many :orgs, through: :presentations_orgs

  scope :includes_associated, -> { includes([:theme, :members, :orgs]) }
end
