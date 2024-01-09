# == Schema Information
#
# Table name: themes
#
#  id           :bigint           not null, primary key
#  title        :string
#  slug         :string           not null
#  published_at :datetime
#  status       :integer          default("draft")
#  circle_id    :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
FactoryBot.define do
  factory :theme do
    title { "MyString" }
    slug { "MyString" }
  end
end
