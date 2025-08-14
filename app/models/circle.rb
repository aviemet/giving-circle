# == Schema Information
#
# Table name: circles
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  slug       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_circles_on_slug  (slug) UNIQUE
#
class Circle < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  include PgSearchable
  pg_search_config(against: [:name])

  resourcify

  validates :name, presence: true

  has_many :ownerships, dependent: :restrict_with_error
  {
    memberships: "Membership",
    themes: "Theme",
    orgs: "Org",
    templates: "Template",
    presentations: "Presentation"
  }.each_pair do |assoc, model|
    has_many assoc, through: :ownerships, source: :ownable, source_type: model
  end

  scope :includes_associated, -> { includes([:themes, :presentations, :memberships, :orgs]) }
end
