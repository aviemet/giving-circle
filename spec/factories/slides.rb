# == Schema Information
#
# Table name: slides
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  slug       :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :slide do
    title { Faker::Book.title }
    data { {
      content: {},
      root: {},
      zones: {},
    } }
  end
end
