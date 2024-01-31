# == Schema Information
#
# Table name: contacts
#
#  id               :bigint           not null, primary key
#  contactable_type :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  contactable_id   :bigint           not null
#
# Indexes
#
#  index_contacts_on_contactable  (contactable_type,contactable_id)
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
