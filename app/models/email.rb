# == Schema Information
#
# Table name: emails
#
#  id          :uuid             not null, primary key
#  email       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :uuid             not null
#  contact_id  :uuid             not null
#
# Indexes
#
#  index_emails_on_category_id  (category_id)
#  index_emails_on_contact_id   (contact_id)
#
# Foreign Keys
#
#  fk_rails_...  (category_id => categories.id)
#  fk_rails_...  (contact_id => contacts.id)
#
class Email < ApplicationRecord
  include Categorizable
  include PgSearchable

  pg_search_config(
    against: [:email],
    associated_against: {
      contact: [],
    },
  )

  resourcify

  belongs_to :contact, optional: false

  scope :includes_associated, -> { includes([:contact, :category]) }
end
