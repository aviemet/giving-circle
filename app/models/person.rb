# == Schema Information
#
# Table name: people
#
#  id          :bigint           not null, primary key
#  active      :boolean          default(TRUE), not null
#  first_name  :string
#  last_name   :string
#  middle_name :string
#  number      :string
#  slug        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Person < ApplicationRecord
  include PgSearch::Model

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

  slug :full_name

  has_one :user, dependent: :nullify

  validates :first_name, presence: true
  validates :last_name, presence: true

  scope :includes_associated, -> { includes([:user]) }

  def full_name
    "#{first_name} #{last_name}"
  end

  alias :name :full_name
end
