# == Schema Information
#
# Table name: addresses
#
#  id         :bigint           not null, primary key
#  address    :string
#  address_2  :string
#  city       :string
#  country    :string
#  postal     :string
#  region     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  contact_id :bigint           not null
#
# Indexes
#
#  index_addresses_on_contact_id  (contact_id)
#
# Foreign Keys
#
#  fk_rails_...  (contact_id => contacts.id)
#
FactoryBot.define do
  factory :address do
    address { "MyString" }
    address_2 { "MyString" }
    city { "MyString" }
    region { "MyString" }
    country { "MyString" }
    postal { "MyString" }
    contact { nil }
  end
end
