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
class ThemesOrg < ApplicationRecord
  belongs_to :theme
  belongs_to :org

  monetize :ask_cents, allow_blank: true, allow_nil: true, numericality: { greater_than_or_equal_to: 0 }

  scope :includes_associated, -> { includes([:theme, :org]) }
end
