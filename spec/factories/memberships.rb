# == Schema Information
#
# Table name: memberships
#
#  id             :uuid             not null, primary key
#  active         :boolean          default(TRUE), not null
#  funds_cents    :integer          default(0), not null
#  funds_currency :string           default("USD"), not null
#  name           :string           not null
#  number         :string
#  slug           :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  person_id      :uuid             not null
#
# Indexes
#
#  index_memberships_on_person_id  (person_id)
#  index_memberships_on_slug       (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (person_id => people.id)
#
FactoryBot.define do
  factory :membership do
    name { Faker::Name.name }
    number { Faker::Number.unique.number(digits: 6) }
    funds_cents { Faker::Number.between(from: 50000, to: 1000000) }

    circle
    person
  end
end
