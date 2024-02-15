# == Schema Information
#
# Table name: themes
#
#  id           :bigint           not null, primary key
#  published_at :datetime
#  slug         :string           not null
#  status       :integer          default("draft")
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  circle_id    :bigint           not null
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

  validates :title, presence: true

  belongs_to :circle
  has_many :presentations, dependent: :destroy
  has_many :themes_org, dependent: :destroy
  has_many :orgs, through: :themes_org
  has_many :themes_member, dependent: :destroy
  has_many :members, through: :themes_member

  scope :includes_associated, -> { includes([:circle, :presentations, :orgs]) }
end
