# == Schema Information
#
# Table name: people
#
#  id          :uuid             not null, primary key
#  active      :boolean          default(TRUE), not null
#  first_name  :string
#  last_name   :string
#  middle_name :string
#  slug        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_people_on_slug  (slug) UNIQUE
#
class Person < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  include PgSearchable
  pg_search_config(
    against: [:first_name, :last_name, :middle_name],
    associated_against: {
      user: [:email]
    },
  )

  resourcify

  has_one :user, dependent: :nullify

  has_many :memberships_people, dependent: :destroy
  has_many :memberships, through: :memberships_people

  has_many :circles, through: :memberships

  validates :first_name, presence: true
  validates :last_name, presence: true

  scope :includes_associated, -> { includes([:user]) }

  def name
    "#{first_name} #{last_name}".strip
  end
end
