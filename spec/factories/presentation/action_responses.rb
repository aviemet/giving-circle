# == Schema Information
#
# Table name: presentation_action_responses
#
#  id                     :uuid             not null, primary key
#  response_data          :jsonb
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  membership_id          :uuid             not null
#  presentation_action_id :uuid             not null
#
# Indexes
#
#  index_presentation_action_responses_on_membership_id           (membership_id)
#  index_presentation_action_responses_on_presentation_action_id  (presentation_action_id)
#
# Foreign Keys
#
#  fk_rails_...  (membership_id => memberships.id)
#  fk_rails_...  (presentation_action_id => presentation_actions.id)
#
FactoryBot.define do
  factory :presentation_action_response, class: "Presentation::ActionResponse" do
    presentation_action { nil }
    membership { nil }
    response_data { "" }
  end
end
