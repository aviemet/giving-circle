# == Schema Information
#
# Table name: circles
#
#  id         :uuid             not null, primary key
#  mock_data  :boolean          default(FALSE), not null
#  name       :string           not null
#  slug       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_circles_on_slug  (slug) UNIQUE
#
FactoryBot.define do
  factory :circle do
    name { "#{Faker::Commerce.brand} #{Faker::IndustrySegments.industry}" }
  end
end
