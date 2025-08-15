# == Schema Information
#
# Table name: contacts
#
#  id               :uuid             not null, primary key
#  contactable_type :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  contactable_id   :uuid             not null
#
# Indexes
#
#  index_contacts_on_contactable  (contactable_type,contactable_id)
#
class ContactSerializer < ApplicationSerializer
  attributes(
    :notes,
    :contactable_type,
    :contactable_id,
    :primary_address_id,
    :primary_phone_id,
    :primary_email_id,
  )
end
