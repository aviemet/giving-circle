# == Schema Information
#
# Table name: emails
#
#  id         :uuid             not null, primary key
#  email      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  contact_id :uuid
#
# Indexes
#
#  index_emails_on_contact_id  (contact_id)
#
class Email < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:email],
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
