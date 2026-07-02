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

  has_many :themes, dependent: :restrict_with_error
  has_many :orgs, dependent: :restrict_with_error
  has_many :memberships, dependent: :restrict_with_error
  has_many :templates, dependent: :restrict_with_error
  has_many :presentations, through: :themes
  has_many :smtps, dependent: :destroy

  scope :includes_associated, -> { includes([:presentations, :memberships, :orgs, :themes]) }

  # MockCircle should be used if mock data is needed, these scopes separate the two models
  default_scope { where(mock_data: false) }
  scope :with_mock, -> { unscoped }
  scope :mock_only, -> { unscoped.where(mock_data: true) }
end
