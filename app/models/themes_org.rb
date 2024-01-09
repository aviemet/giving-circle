# == Schema Information
#
# Table name: themes_orgs
#
#  id         :bigint           not null, primary key
#  org_id     :bigint           not null
#  theme_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ThemesOrg < ApplicationRecord
  belongs_to :theme
  belongs_to :org

  scope :includes_associated, -> { includes([:theme, :org]) }
end
