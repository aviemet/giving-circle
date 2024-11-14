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
FactoryBot.define do
  factory :contact do
    contactable factory: :person
  end
end
