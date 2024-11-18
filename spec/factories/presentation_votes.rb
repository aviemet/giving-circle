# == Schema Information
#
# Table name: presentation_votes
#
#  id         :uuid             not null, primary key
#  name       :string
#  type       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :presentation_vote do
    name { "MyString" }
    type { 1 }
  end
end
