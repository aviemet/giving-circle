# == Schema Information
#
# Table name: orgs
#
#  id          :uuid             not null, primary key
#  description :string
#  name        :string
#  slug        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_orgs_on_slug  (slug) UNIQUE
#
class Org < ApplicationRecord
  include PgSearch::Model

  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  pg_search_scope(
    :search,
    against: [:name, :description],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  validates :name, presence: true

  has_many :presentations_orgs, dependent: :destroy
  has_many :presentations, through: :presentations_orgs

  scope :includes_associated, -> { includes([:presentations]) }
end
