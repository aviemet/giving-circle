# == Schema Information
#
# Table name: circles
#
#  id         :uuid             not null, primary key
#  mock_data  :boolean          default(FALSE), not null
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

  # MockCircle should be used if mock data is needed, these scopes separate the two models
  default_scope { where(mock_data: false) }
  scope :with_mock, -> { unscoped }
  scope :mock_only, -> { unscoped.where(mock_data: true) }
end
