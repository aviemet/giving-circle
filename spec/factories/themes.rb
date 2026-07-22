# == Schema Information
#
# Table name: themes
#
#  id           :uuid             not null, primary key
#  description  :text
#  heading      :string
#  name         :string           not null
#  published_at :datetime
#  slug         :string
#  status       :integer          default("draft")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  circle_id    :uuid             not null
#
# Indexes
#
#  index_themes_on_circle_id  (circle_id)
#  index_themes_on_slug       (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
FactoryBot.define do
  factory :theme do
    name { Faker::Book.title }
    heading { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    status { "draft" }

    circle
  end
end
