# == Schema Information
#
# Table name: circles
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_circles_on_slug  (slug) UNIQUE
#
FactoryBot.define do
  factory :circle do
    name { "MyString" }
  end
end
