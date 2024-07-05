# == Schema Information
#
# Table name: presentation_elements
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  element    :integer
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :presentation_element do
    title { "MyString" }
    data { "" }
    element { 1 }
  end
end
