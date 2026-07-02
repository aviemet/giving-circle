# == Schema Information
#
# Table name: orgs
#
#  id          :uuid             not null, primary key
#  description :string
#  name        :string           not null
#  slug        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  circle_id   :uuid             not null
#
# Indexes
#
#  index_orgs_on_circle_id  (circle_id)
#  index_orgs_on_slug       (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
FactoryBot.define do
  factory :org do
    name { Faker::Company.name }
    description { Faker::Lorem.paragraph }

    circle
  end
end
