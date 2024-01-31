# == Schema Information
#
# Table name: contacts
#
#  id               :bigint           not null, primary key
#  contactable_type :string           not null
#  contactable_id   :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Contact < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:contactable],
    associated_against: {
      contactable: [],
    },
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  belongs_to :contactable, polymorphic: true

  scope :includes_associated, -> { includes([:contactable]) }
end
