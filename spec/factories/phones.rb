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
FactoryBot.define do
  factory :phone do
    number { Faker::PhoneNumber.phone_number }
    contact
  end
end
