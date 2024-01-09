# == Schema Information
#
# Table name: orgs
#
#  id          :bigint           not null, primary key
#  name        :string
#  slug        :string
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Org < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:name, :slug, :description],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  has_many :presentations_orgs
  has_many :presentations, through: :presentations_orgs

  scope :includes_associated, -> { includes([:presentations]) }
end
