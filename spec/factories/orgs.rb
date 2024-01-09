# == Schema Information
#
# Table name: orgs
#
#  id          :bigint           not null, primary key
#  name        :string
#  slug        :string
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :org do
    name { "MyString" }
    slug { "MyString" }
    description { "MyString" }
  end
end
