# == Schema Information
#
# Table name: themes_members
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  member_id  :bigint           not null
#  theme_id   :bigint           not null
#
# Indexes
#
#  index_themes_members_on_member_id  (member_id)
#  index_themes_members_on_theme_id   (theme_id)
#
# Foreign Keys
#
#  fk_rails_...  (member_id => people.id)
#  fk_rails_...  (theme_id => themes.id)
#
FactoryBot.define do
  factory :themes_member do
    theme { nil }
    member { nil }
  end
end
