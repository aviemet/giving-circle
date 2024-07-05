# == Schema Information
#
# Table name: themes_members
#
#  id         :uuid             not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  member_id  :uuid             not null
#  theme_id   :uuid             not null
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
require 'rails_helper'

RSpec.describe ThemesMember, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
