# == Schema Information
#
# Table name: circles
#
#  id         :bigint           not null, primary key
#  name       :string
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
