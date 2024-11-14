# == Schema Information
#
# Table name: people
#
#  id             :uuid             not null, primary key
#  active         :boolean          default(TRUE), not null
#  first_name     :string
#  funds_cents    :integer
#  funds_currency :string           default("USD"), not null
#  last_name      :string
#  middle_name    :string
#  number         :string
#  slug           :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_people_on_slug  (slug) UNIQUE
#
require 'rails_helper'

RSpec.describe Member do
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(build(:member)).to be_valid
    end

    it "is invalid with invalid attributes" do
      %i(first_name last_name number).each do |attr|
        expect(build(:member, attr => nil)).not_to be_valid
      end
    end
  end

  describe "Attributes" do
    it { is_expected.to monetize(:funds) }
  end

  describe "Associations" do
    it { is_expected.to have_many(:circles).through(:circles_members) }
    it { is_expected.to have_many(:presentations).through(:presentations_members) }
  end
end
