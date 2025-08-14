# == Schema Information
#
# Table name: orgs
#
#  id          :uuid             not null, primary key
#  description :string
#  name        :string           not null
#  slug        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_orgs_on_slug  (slug) UNIQUE
#
class Org < ApplicationRecord
  include Ownable

  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  include PgSearchable
  pg_search_config(
    against: [:name, :description],
  )

  resourcify

  validates :name, presence: true

  attribute :ask_cents
  monetize :ask_cents, allow_blank: true, allow_nil: true, numericality: { greater_than_or_equal_to: 0 }

  has_many :themes_orgs, dependent: :destroy
  has_many :themes, through: :themes_orgs

  has_many :presentations_orgs, dependent: :destroy
  has_many :presentations, through: :presentations_orgs

  scope :includes_associated, -> { includes([:presentations_orgs, :presentations, :themes_orgs, :themes]) }
end
