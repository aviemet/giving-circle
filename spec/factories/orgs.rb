# == Schema Information
#
# Table name: orgs
#
#  id          :uuid             not null, primary key
#  description :string
#  name        :string
#  slug        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_orgs_on_slug  (slug) UNIQUE
#
FactoryBot.define do
  factory :org do
    name { Faker::Company.name }

    circle
  end
end
