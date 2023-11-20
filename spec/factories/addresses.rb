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
