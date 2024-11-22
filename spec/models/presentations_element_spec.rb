# == Schema Information
#
# Table name: presentations_elements
#
#  id                      :uuid             not null, primary key
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  presentation_element_id :uuid             not null
#  presentation_id         :uuid             not null
#
# Indexes
#
#  index_presentations_elements_on_presentation_element_id  (presentation_element_id)
#  index_presentations_elements_on_presentation_id          (presentation_id)
#
# Foreign Keys
#
#  fk_rails_...  (presentation_element_id => presentation_elements.id)
#  fk_rails_...  (presentation_id => presentations.id)
#
require 'rails_helper'

RSpec.describe PresentationsElement, type: :model do
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(build(:presentations_element)).to be_valid
    end

    it "is invalid with invalid attributes" do
      %i(presentation element).each do |attr|
        expect(build(:presentations_element, attr => nil)).not_to be_valid
      end
    end
  end

  describe "Associations" do
    it { is_expected.to belong_to(:presentation) }
    it { is_expected.to belong_to(:element) }
  end
end
