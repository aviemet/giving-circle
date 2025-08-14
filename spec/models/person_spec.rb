# == Schema Information
#
# Table name: people
#
#  id          :uuid             not null, primary key
#  active      :boolean          default(TRUE), not null
#  first_name  :string
#  last_name   :string
#  middle_name :string
#  slug        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_people_on_slug  (slug) UNIQUE
#
require 'rails_helper'

RSpec.describe Person do
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(build(:person)).to be_valid
    end

    it "is invalid with invalid attributes" do
      %i(first_name last_name).each do |attr|
        expect(build(:person, attr => nil)).not_to be_valid
      end
    end
  end

  describe "Associations" do
    it { is_expected.to have_one(:user) }
    it { is_expected.to have_many(:memberships).through(:memberships_people) }
    it { is_expected.to have_many(:circles) }
  end
end
