# == Schema Information
#
# Table name: presentations_distributions
#
#  id                           :uuid             not null, primary key
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#  presentation_distribution_id :uuid             not null
#  presentation_id              :uuid             not null
#
# Indexes
#
#  idx_on_presentation_distribution_id_1e817598d7        (presentation_distribution_id)
#  index_presentations_distributions_on_presentation_id  (presentation_id)
#
# Foreign Keys
#
#  fk_rails_...  (presentation_distribution_id => presentation_distributions.id)
#  fk_rails_...  (presentation_id => presentations.id)
#
require 'rails_helper'

RSpec.describe PresentationsDistribution, type: :model do
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(build(:presentations_distribution)).to be_valid
    end

    it "is invalid with invalid attributes" do
      %i(presentation distribution).each do |attr|
        expect(build(:presentations_distribution, attr => nil)).not_to be_valid
      end
    end
  end

  describe "Associations" do
    it { is_expected.to belong_to(:presentation) }
    it { is_expected.to belong_to(:distribution) }
  end
end
