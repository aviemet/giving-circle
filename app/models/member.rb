# == Schema Information
#
# Table name: members
#
#  id         :bigint           not null, primary key
#  first_name :string
#  last_name  :string
#  number     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Member < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:first_name, :last_name, :number],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  has_many :circles_members
  has_many :circles, through: :circles_members

  scope :includes_associated, -> { includes([:circles]) }
end
