# == Schema Information
#
# Table name: themes_orgs
#
#  id         :uuid             not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  org_id     :uuid             not null
#  theme_id   :uuid             not null
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
class ThemesOrg < ApplicationRecord
  belongs_to :theme
  belongs_to :org

  scope :includes_associated, -> { includes([:theme, :org]) }
end
