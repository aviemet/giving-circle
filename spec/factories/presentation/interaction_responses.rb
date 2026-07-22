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
FactoryBot.define do
  factory :presentation_interaction_response, class: "Presentation::InteractionResponse" do
    presentation_interaction
    membership { association(:membership, circle: presentation_interaction.presentation.circle) }

    transient do
      presentation { presentation_interaction.presentation }
    end

    after(:build) do |response, evaluator|
      presentation = evaluator.presentation || response.presentation_interaction&.presentation
      next if presentation.blank?
      next if presentation.circle.id != response.membership.circle_id
      next if presentation.membership_ids.include?(response.membership_id)

      create(:presentations_membership, presentation: presentation, membership: response.membership)
    end

    response_data do
      {
        allocations: [
          { org_id: SecureRandom.uuid, amount_cents: 100 },
        ],
      }
    end
  end
end
