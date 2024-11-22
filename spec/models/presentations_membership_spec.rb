# == Schema Information
#
# Table name: presentations_memberships
#
#  id              :uuid             not null, primary key
#  funds_cents     :integer
#  funds_currency  :string           default("USD"), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  membership_id   :uuid             not null
#  presentation_id :uuid             not null
#
# Indexes
#
#  index_presentations_memberships_on_membership_id    (membership_id)
#  index_presentations_memberships_on_presentation_id  (presentation_id)
#
# Foreign Keys
#
#  fk_rails_...  (membership_id => memberships.id)
#  fk_rails_...  (presentation_id => presentations.id)
#
require 'rails_helper'

RSpec.describe PresentationsMembership do
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(build(:presentations_membership)).to be_valid
    end

    it "is invalid with invalid attributes" do
      %i(presentation membership).each do |attr|
        expect(build(:presentations_membership, attr => nil)).not_to be_valid
      end
    end
  end

  describe "Associations" do
    it { is_expected.to belong_to(:presentation) }
    it { is_expected.to belong_to(:membership) }
  end
end
