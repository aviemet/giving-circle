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
  validate :theme_owner_matches_org_owner

  belongs_to :theme
  belongs_to :org

  monetize :ask_cents, numericality: { greater_than_or_equal_to: 0 }

  scope :includes_associated, -> { includes([:theme, :org]) }

  private

  def theme_owner_matches_org_owner
    return unless theme&.circle && org&.circle

    unless theme.circle.id == org.circle.id
      errors.add(:theme_owner_matches_org_owner, "theme owner and org owner must match")
    end
  end
end
