# == Schema Information
#
# Table name: presentations
#
#  id         :bigint           not null, primary key
#  theme_id   :bigint           not null
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :presentation do
    theme { nil }
    name { "MyString" }
  end
end
