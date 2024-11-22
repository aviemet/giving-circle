# == Schema Information
#
# Table name: memberships_people
#
#  id            :uuid             not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  membership_id :uuid             not null
#  person_id     :uuid             not null
#
# Indexes
#
#  index_memberships_people_on_membership_id  (membership_id)
#  index_memberships_people_on_person_id      (person_id)
#
# Foreign Keys
#
#  fk_rails_...  (membership_id => memberships.id)
#  fk_rails_...  (person_id => people.id)
#
require 'rails_helper'

RSpec.describe MembershipsPerson do
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(build(:memberships_person)).to be_valid
    end

    it "is invalid with invalid attributes" do
      %i(membership person).each do |attr|
        expect(build(:memberships_person, attr => nil)).not_to be_valid
      end
    end
  end

  describe "Associations" do
    it { is_expected.to belong_to(:person) }
    it { is_expected.to belong_to(:membership) }
  end
end
