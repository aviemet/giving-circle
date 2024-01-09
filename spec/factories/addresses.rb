# == Schema Information
#
# Table name: addresses
#
#  id         :bigint           not null, primary key
#  address    :string
#  address_2  :string
#  city       :string
#  region     :string
#  country    :string
#  postal     :string
#  contact_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
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
