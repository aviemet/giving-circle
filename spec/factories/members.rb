# == Schema Information
#
# Table name: people
#
#  id          :bigint           not null, primary key
#  active      :boolean          default(TRUE), not null
#  first_name  :string
#  last_name   :string
#  middle_name :string
#  number      :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :member do
    first_name { "MyString" }
    last_name { "MyString" }
    number { "MyString" }
  end
end
