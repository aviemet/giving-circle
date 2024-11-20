# == Schema Information
#
# Table name: orgs
#
#  id          :uuid             not null, primary key
#  description :string
#  name        :string
#  slug        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_orgs_on_slug  (slug) UNIQUE
#
require 'rails_helper'

RSpec.describe Org do
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(build(:org)).to be_valid
    end

    it "is invalid with invalid attributes" do
      %i(name).each do |attr|
        expect(build(:org, attr => nil)).not_to be_valid
      end
    end
  end

  describe "Attributes" do
    it { is_expected.to monetize(:ask).allow_nil }
  end

  describe "Associations" do
    it { is_expected.to have_many(:themes_orgs) }
    it { is_expected.to have_many(:themes) }
    it { is_expected.to have_many(:presentations_orgs) }
    it { is_expected.to have_many(:presentations) }
    it { is_expected.to belong_to(:circle) }
  end
end
