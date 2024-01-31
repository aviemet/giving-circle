# == Schema Information
#
# Table name: circles
#
#  id         :bigint           not null, primary key
#  name       :string
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_circles_on_slug  (slug) UNIQUE
#
class Circle < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:name],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  slug :name

  resourcify

  validates :name, presence: true

  has_many :themes, dependent: :nullify
  has_many :presentations, through: :themes

  has_many :circles_member, dependent: :destroy
  has_many :members, through: :circles_member

  scope :includes_associated, -> { includes([:themes, :presentations, :members]) }
end
