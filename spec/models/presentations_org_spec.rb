# == Schema Information
#
# Table name: presentations_orgs
#
#  id              :uuid             not null, primary key
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  org_id          :uuid             not null
#  presentation_id :uuid             not null
#
# Indexes
#
#  index_presentations_orgs_on_org_id           (org_id)
#  index_presentations_orgs_on_presentation_id  (presentation_id)
#
# Foreign Keys
#
#  fk_rails_...  (org_id => orgs.id)
#  fk_rails_...  (presentation_id => presentations.id)
#
require 'rails_helper'

RSpec.describe PresentationsOrg, type: :model do
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(build(:presentations_org)).to be_valid
    end

    it "is invalid with invalid attributes" do
      %i(presentation org).each do |attr|
        expect(build(:presentations_org, attr => nil)).not_to be_valid
      end
    end
  end

  describe "Associations" do
    it { is_expected.to belong_to(:presentation) }
    it { is_expected.to belong_to(:org) }
  end
end
