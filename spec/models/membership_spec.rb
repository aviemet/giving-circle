# == Schema Information
#
# Table name: memberships
#
#  id             :uuid             not null, primary key
#  active         :boolean          default(TRUE), not null
#  funds_cents    :integer          default(0), not null
#  funds_currency :string           default("USD"), not null
#  name           :string
#  number         :string
#  slug           :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_memberships_on_slug  (slug) UNIQUE
#
require 'rails_helper'

require "models/shared/ownable"

RSpec.describe Membership, type: :model do
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(build(:membership)).to be_valid
    end

    it "is invalid with invalid attributes" do
      %i(name number).each do |attr|
        expect(build(:membership, attr => nil)).not_to be_valid
      end
    end
  end

  describe "Attributes" do
    it { is_expected.to monetize(:funds) }
  end

  describe "Associations" do
    it_behaves_like "ownable"
    it { is_expected.to have_many(:people).through(:memberships_people) }
    it { is_expected.to have_many(:presentations).through(:presentations_memberships) }

    context "with one person per membership" do
      it "can retrieve the member" do
        person = create(:person)
        membership = create(:membership)
        membership.people << person

        expect(membership.people.count).to eq(1)
      end
    end

    context "with more than one person per membership" do
      it "retrieves all members" do
        membership = create(:membership)
        2.times do
          person = create(:person)
          membership.people << person
        end

        expect(membership.people.count).to eq(2)
      end
    end
  end
end
