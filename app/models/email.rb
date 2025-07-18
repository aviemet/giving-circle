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
  include PgSearchable
  pg_search_config(
    against: [:email],
    associated_against: {
      contact: [],
    },
  )

  resourcify

  belongs_to :contact

  scope :includes_associated, -> { includes([:contact]) }
end
