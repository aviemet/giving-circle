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
class Presentation::InteractionResponseSerializer < ApplicationSerializer
  object_as :presentation_interaction_response, model: "Presentation::InteractionResponse"

  attributes(
    :response_data,
    :membership_id,
    :presentation_interaction_id,
  )
end
