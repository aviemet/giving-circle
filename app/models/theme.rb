# == Schema Information
#
# Table name: themes
#
#  id           :uuid             not null, primary key
#  name         :string
#  published_at :datetime
#  slug         :string           not null
#  status       :integer          default("draft")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  circle_id    :uuid             not null
#
# Indexes
#
#  index_themes_on_circle_id  (circle_id)
#  index_themes_on_slug       (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
class Theme < ApplicationRecord
  include PgSearch::Model
  include BooleanTimestamp

  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  enum :status, { draft: 0, current: 1, past: 2, future: 3 }
  boolean_timestamp :published

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

  belongs_to :circle
  has_many :presentations, dependent: :destroy

  has_many :themes_org, dependent: :destroy
  has_many :orgs, through: :themes_org

  has_many :themes_member, dependent: :destroy
  has_many :members, through: :themes_member

  scope :includes_associated, -> { includes([:circle, :presentations, :orgs]) }
end
