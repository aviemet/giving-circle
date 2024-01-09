# == Schema Information
#
# Table name: members
#
#  id         :bigint           not null, primary key
#  first_name :string
#  last_name  :string
#  number     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :member do
    first_name { "MyString" }
    last_name { "MyString" }
    number { "MyString" }
  end
end
