# == Schema Information
#
# Table name: people
#
#  id             :uuid             not null, primary key
#  active         :boolean          default(TRUE), not null
#  first_name     :string
#  funds_cents    :integer
#  funds_currency :string           default("USD"), not null
#  last_name      :string
#  middle_name    :string
#  number         :string
#  slug           :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_people_on_slug  (slug) UNIQUE
#
FactoryBot.define do
  factory :member do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    number { Faker::Number.unique.number(digits: 6) }
    funds_cents { Faker::Number.between(from: 50000, to: 1000000) }

    circle
  end
end
