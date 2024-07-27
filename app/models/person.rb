# == Schema Information
#
# Table name: people
#
#  id             :uuid             not null, primary key
#  active         :boolean          default(TRUE), not null
#  first_name     :string
#  funds_cents    :integer
#  funds_currency :string           default("USD"), not null
#  last_name      :string
#  middle_name    :string
#  number         :string
#  slug           :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_people_on_slug  (slug) UNIQUE
#
class Person < ApplicationRecord
  include PgSearch::Model

  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  pg_search_scope(
    :search,
    against: [:first_name, :last_name, :middle_name, :number],
    associated_against: {
      user: [:email]
    },
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  has_one :user, dependent: :nullify

  validates :first_name, presence: true
  validates :last_name, presence: true

  scope :includes_associated, -> { includes([:user]) }

  def name
    "#{first_name} #{last_name}".strip
  end
end
