FactoryBot.define do
  factory :person, as: :member do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }

    membership
  end
end
