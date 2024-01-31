# == Schema Information
#
# Table name: emails
#
#  id         :bigint           not null, primary key
#  email      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  contact_id :bigint
#
# Indexes
#
#  index_emails_on_contact_id  (contact_id)
#
FactoryBot.define do
  factory :email do
    email { "MyString" }
  end
end
