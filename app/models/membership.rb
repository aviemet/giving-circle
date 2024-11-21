# == Schema Information
#
# Table name: memberships
#
#  id             :uuid             not null, primary key
#  active         :boolean          default(TRUE), not null
#  funds_cents    :integer          default(0), not null
#  funds_currency :string           default("USD"), not null
#  name           :string
#  number         :string
#  slug           :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_memberships_on_slug  (slug) UNIQUE
#
class Membership < ApplicationRecord
  include Ownable
  include PgSearch::Model

  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  pg_search_scope(
    :search,
    against: [:number, :funds, :active, :name],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  after_initialize :set_default_funds, if: :new_record?
  after_initialize :set_default_name, if: :new_record?

  monetize :funds_cents

  validates :name, presence: true
  validates :number, presence: true

  has_many :memberships_people, dependent: :destroy
  has_many :people, through: :memberships_people

  has_many :presentations_memberships, dependent: :destroy
  has_many :presentations, through: :presentations_memberships

  scope :includes_associated, -> { includes([]) }

  private

  def set_default_funds
    self.funds_cents ||= 0
  end

  def set_default_name
    self.people.first&.name || ""
  end
end