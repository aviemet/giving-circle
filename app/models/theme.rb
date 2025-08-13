# == Schema Information
#
# Table name: themes
#
#  id           :uuid             not null, primary key
#  name         :string           not null
#  published_at :datetime
#  slug         :string           not null
#  status       :integer          default("draft")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_themes_on_slug  (slug) UNIQUE
#
class Theme < ApplicationRecord
  include Ownable
  include BooleanTimestamp

  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  include PgSearchable
  pg_search_config(against: [:name])

  enum :status, { draft: 0, current: 1, past: 2, future: 3 }
  boolean_timestamp :published

  resourcify

  validates :name, presence: true

  has_many :presentations, dependent: :destroy

  has_many :themes_orgs, dependent: :destroy
  has_many :orgs, -> {
    # Merge ask values from join table onto org records
    select("orgs.*, themes_orgs.ask_cents as ask_cents, themes_orgs.ask_currency as ask_currency")
      .includes(:circle)
      # Override count method which would error with the above select statement
      .extending {
        def count(args = :all)
          except(:select).calculate(:count, args)
        end
      }
  }, through: :themes_orgs

  scope :includes_associated, -> { includes([:circle, :presentations, :orgs]) }
end
