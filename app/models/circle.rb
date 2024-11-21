# == Schema Information
#
# Table name: circles
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_circles_on_slug  (slug) UNIQUE
#
class Circle < ApplicationRecord
  include PgSearch::Model

  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  pg_search_scope(
    :search,
    against: [:name],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  validates :name, presence: true

  has_many :themes, dependent: :nullify
  has_many :presentations, through: :themes

  has_many :memberships, dependent: :nullify

  has_many :members, -> { distinct }, class_name: 'Person', dependent: :nullify, inverse_of: :circles do
    def to_a
      Person.joins(memberships_people: :membership)
        .where(memberships: { id: proxy_association.owner.memberships.pluck(:id) })
    end
  end

  has_many :orgs, dependent: :nullify

  has_many :ownerships, dependent: :restrict_with_error
  {
    memberships: "Membership",
    themes: "Theme",
    orgs: "Org",
    groups: "Group",
    presentations: "Presentation"
  }.each_pair do |assoc, model|
    has_many assoc, through: :ownerships, source: :ownable, source_type: model
  end

  scope :includes_associated, -> { includes([:themes, :presentations, :members, :orgs, :groups]) }
end
