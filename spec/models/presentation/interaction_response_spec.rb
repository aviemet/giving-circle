# == Schema Information
#
# Table name: presentation_interaction_responses
#
#  id                          :uuid             not null, primary key
#  response_data               :jsonb            not null
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#  membership_id               :uuid             not null
#  presentation_interaction_id :uuid             not null
#
# Indexes
#
#  idx_on_presentation_interaction_id_d5003055ab                 (presentation_interaction_id)
#  idx_pres_interaction_responses_on_interaction_and_membership  (presentation_interaction_id,membership_id)
#  index_presentation_interaction_responses_on_membership_id     (membership_id)
#
# Foreign Keys
#
#  fk_rails_...  (membership_id => memberships.id)
#  fk_rails_...  (presentation_interaction_id => presentation_interactions.id)
#
require "rails_helper"

RSpec.describe Presentation::InteractionResponse, type: :model do
  describe "Associations" do
    it { is_expected.to belong_to(:presentation_interaction) }
    it { is_expected.to belong_to(:membership) }
  end

  describe "validations" do
    it "is valid with valid attributes" do
      expect { create(:presentation_interaction_response) }.not_to raise_error
    end

    it "requires membership to belong to the presentation" do
      presentation = create(:presentation)
      interaction = create(:presentation_interaction, presentation: presentation)
      other_membership = create(:membership)

      response = build(
        :presentation_interaction_response,
        presentation_interaction: interaction,
        membership: other_membership,
        presentation: presentation,
      )

      expect(response).not_to be_valid
      expect(response.errors[:membership]).to be_present
    end

    it "allows multiple responses for the same membership and interaction" do
      existing = create(:presentation_interaction_response)
      duplicate = build(
        :presentation_interaction_response,
        presentation_interaction: existing.presentation_interaction,
        membership: existing.membership,
      )

      expect(duplicate).to be_valid
    end
  end
end
