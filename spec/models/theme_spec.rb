# == Schema Information
#
# Table name: themes
#
#  id           :uuid             not null, primary key
#  description  :text
#  heading      :string
#  name         :string           not null
#  published_at :datetime
#  slug         :string
#  status       :integer          default("draft")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  circle_id    :uuid             not null
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

require "rails_helper"

RSpec.describe Theme do
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(build_stubbed(:circle)).to be_valid
    end

    it "is invalid with invalid attributes" do
      %i(name).each do |attr|
        expect(build(:circle, attr => nil)).not_to be_valid
      end
    end
  end

  # Associations
  describe "Associations" do
    it { is_expected.to belong_to(:circle) }
    it { is_expected.to have_many(:presentations).dependent(:destroy) }
    it { is_expected.to have_many(:themes_orgs).dependent(:destroy) }
    it { is_expected.to have_many(:orgs).through(:themes_orgs) }

    describe "#orgs" do
      it "includes ask_cents and ask_currency from the join table" do
        themes_org = create(:themes_org, {
          ask_cents: 20000,
          ask_currency: "USD"
        })

        org = themes_org.theme.orgs.first

        expect(org.ask_cents).to eq(20000)
        expect(org.ask_currency).to eq("USD")
      end

      it "returns a successful count value" do
        theme = create(:theme)
        create_list(:themes_org, 2, theme:)
        # Dummy Org:
        create(:org, circle: theme.circle)

        expect(theme.orgs.count).to eq(2)
      end

      it "loads ask values after includes_associated without preloading orgs" do
        themes_org = create(:themes_org, ask_cents: 20000, ask_currency: "USD")
        theme = described_class.includes_associated.find(themes_org.theme_id)

        org = theme.orgs.first

        expect(org.ask_cents).to eq(20000)
        expect(org.ask_currency).to eq("USD")
      end
    end
  end
end
