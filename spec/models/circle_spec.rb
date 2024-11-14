# == Schema Information
#
# Table name: circles
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_circles_on_slug  (slug) UNIQUE
#
require 'rails_helper'

RSpec.describe Circle do
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
    it { is_expected.to have_many(:members) }
    it { is_expected.to have_many(:orgs) }
    it { is_expected.to have_many(:groups) }
  end
end
