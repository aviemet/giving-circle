# == Schema Information
#
# Table name: themes
#
#  id           :uuid             not null, primary key
#  name         :string
#  published_at :datetime
#  slug         :string           not null
#  status       :integer          default("draft")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_themes_on_slug  (slug) UNIQUE
#
FactoryBot.define do
  factory :theme do
    name { Faker::Book.title }
    status { 1 }
    circle
  end
end
