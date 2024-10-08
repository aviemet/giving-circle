# == Schema Information
#
# Table name: phones
#
#  id         :uuid             not null, primary key
#  number     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  contact_id :uuid
#
# Indexes
#
#  index_phones_on_contact_id  (contact_id)
#
class Phone < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:number],
    associated_against: {
      contact: [],
    },
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  belongs_to :contact

  scope :includes_associated, -> { includes([:contact]) }
end
