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
#  index_themes_orgs_on_org_id               (org_id)
#  index_themes_orgs_on_theme_id             (theme_id)
#  index_themes_orgs_on_theme_id_and_org_id  (theme_id,org_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (org_id => orgs.id)
#  fk_rails_...  (theme_id => themes.id)
#
require 'rails_helper'

RSpec.describe ThemesOrg do
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(build(:themes_org)).to be_valid
    end

    it "is invalid with invalid attributes" do
      %i(ask_cents org theme).each do |attr|
        expect(build(:themes_org, attr => nil)).not_to be_valid
      end
    end

    it "is invalid if theme.circle and org.circle are not the same" do
      theme = build_stubbed(:theme)
      org = build_stubbed(:org)
      themes_org = build_stubbed(:themes_org, { theme:, org: })

      expect(themes_org).not_to be_valid
    end
  end

  describe "Attributes" do
    it { is_expected.to monetize(:ask) }
  end

  describe "Associations" do
    it { is_expected.to belong_to(:theme) }
    it { is_expected.to belong_to(:org) }
  end
end
