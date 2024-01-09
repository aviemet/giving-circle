# == Schema Information
#
# Table name: phones
#
#  id         :bigint           not null, primary key
#  number     :string
#  contact_id :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :phone do
    number { "MyString" }
  end
end
