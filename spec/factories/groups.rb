# == Schema Information
#
# Table name: groups
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  circle_id  :uuid             not null
#
# Indexes
#
#  index_groups_on_circle_id  (circle_id)
#  index_groups_on_slug       (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
FactoryBot.define do
  factory :group do
    name { "MyString" }
  end
end
