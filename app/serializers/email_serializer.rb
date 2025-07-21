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
class EmailSerializer < ApplicationSerializer
  attributes(
    :name,
    :email,
    :notes,
    :contact_id,
    :category_id,
  )
end
