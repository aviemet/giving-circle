# == Schema Information
#
# Table name: circles
#
#  id         :uuid             not null, primary key
#  mock_data  :boolean          default(FALSE), not null
#  name       :string           not null
#  settings   :jsonb            not null
#  slug       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_circles_on_slug  (slug) UNIQUE
#
require "rails_helper"

RSpec.describe Circle do
  describe "settings" do
    it "defaults primary_color to blue" do
      circle = build(:circle)

      expect(circle.settings.primary_color).to eq("blue")
    end

    it "persists primary_color in the settings jsonb column" do
      circle = create(:circle)
      circle.settings.primary_color = "grape"
      circle.save!

      expect(circle.reload.settings.primary_color).to eq("grape")
      expect(circle.read_attribute(:settings)["primary_color"]).to eq("grape")
    end
  end

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

  describe "Associations" do
    it { is_expected.to have_many(:themes) }
    it { is_expected.to have_many(:presentations) }
    it { is_expected.to have_many(:memberships) }
    it { is_expected.to have_many(:orgs) }
  end
end
