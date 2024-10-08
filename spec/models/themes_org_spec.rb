# == Schema Information
#
# Table name: themes_orgs
#
#  id           :uuid             not null, primary key
#  ask_cents    :integer
#  ask_currency :string           default("USD"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  org_id       :uuid             not null
#  theme_id     :uuid             not null
#
# Indexes
#
#  index_themes_orgs_on_org_id    (org_id)
#  index_themes_orgs_on_theme_id  (theme_id)
#
# Foreign Keys
#
#  fk_rails_...  (org_id => orgs.id)
#  fk_rails_...  (theme_id => themes.id)
#
require 'rails_helper'

RSpec.describe ThemesOrg, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
