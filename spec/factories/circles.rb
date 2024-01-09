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
FactoryBot.define do
  factory :circle do
    name { "MyString" }
  end
end
