# == Schema Information
#
# Table name: phones
#
#  id         :bigint           not null, primary key
#  number     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  contact_id :bigint
#
# Indexes
#
#  index_phones_on_contact_id  (contact_id)
#
FactoryBot.define do
  factory :phone do
    number { "MyString" }
  end
end
