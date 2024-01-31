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
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Person < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:first_name, :last_name, :middle_name, :number],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  has_one :user, dependent: :nullify

  validates :first_name, presence: true
  validates :last_name, presence: true

  scope :includes_associated, -> { includes([]) }
end
