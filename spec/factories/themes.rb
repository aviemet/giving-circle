# == Schema Information
#
# Table name: themes
#
#  id           :bigint           not null, primary key
#  published_at :datetime
#  slug         :string           not null
#  status       :integer          default("draft")
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  circle_id    :bigint           not null
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
    title { "MyString" }
    slug { "MyString" }
  end
end
