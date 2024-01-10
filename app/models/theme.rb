# == Schema Information
#
# Table name: themes
#
#  id           :bigint           not null, primary key
#  title        :string
#  slug         :string           not null
#  published_at :datetime
#  status       :integer          default("draft")
#  circle_id    :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
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

  scope :includes_associated, -> { includes([:circle, :presentations, :orgs]) }
end
