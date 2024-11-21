# == Schema Information
#
# Table name: memberships
#
#  id             :uuid             not null, primary key
#  active         :boolean          default(TRUE), not null
#  funds_cents    :integer          default(0), not null
#  funds_currency :string           default("USD"), not null
#  name           :string
#  number         :string
#  slug           :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_memberships_on_slug  (slug) UNIQUE
#
FactoryBot.define do
  factory :membership do
    name { Faker::Name.name }
    number { Faker::Number.unique.number(digits: 6) }
    funds_cents { Faker::Number.between(from: 50000, to: 1000000) }

    circle
  end
end
