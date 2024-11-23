# == Schema Information
#
# Table name: themes
#
#  id           :uuid             not null, primary key
#  name         :string
#  published_at :datetime
#  slug         :string           not null
#  status       :integer          default("draft")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_themes_on_slug  (slug) UNIQUE
#

require 'rails_helper'

require "models/shared/ownable"

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
    it_behaves_like "ownable"
    it { is_expected.to have_many(:presentations).dependent(:destroy) }
    it { is_expected.to have_many(:themes_orgs).dependent(:destroy) }
    it { is_expected.to have_many(:orgs).through(:themes_orgs) }

    describe "#orgs" do
      it 'includes ask_cents and ask_currency from the join table' do
        themes_org = create(:themes_org, {
          ask_cents: 20000,
          ask_currency: "USD"
        },)

        org = themes_org.theme.orgs.first

        expect(org.ask_cents).to eq(20000)
        expect(org.ask_currency).to eq("USD")
      end

      it 'returns a successful count value' do
        theme = create(:theme)
        create_list(:themes_org, 2, { theme:, circle: theme.circle })

        expect(theme.orgs.count).to eq(2)
      end
    end
  end
end
