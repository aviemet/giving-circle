# == Schema Information
#
# Table name: presentation_interactions
#
#  id                         :uuid             not null, primary key
#  accepting_responses        :boolean          default(FALSE), not null
#  config                     :jsonb            not null
#  name                       :string           not null
#  results                    :jsonb            not null
#  slug                       :string           not null
#  trigger_conditions         :jsonb            not null
#  trigger_type               :integer          default("manual"), not null
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  interaction_ui_template_id :uuid             not null
#  presentation_id            :uuid             not null
#
# Indexes
#
#  index_presentation_interactions_on_interaction_ui_template_id  (interaction_ui_template_id)
#  index_presentation_interactions_on_presentation_id             (presentation_id)
#  index_presentation_interactions_on_presentation_id_and_slug    (presentation_id,slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (interaction_ui_template_id => interaction_ui_templates.id)
#  fk_rails_...  (presentation_id => presentations.id)
#
class Presentation::InteractionSerializer < ApplicationSerializer
  object_as :presentation_interaction, model: "Presentation::Interaction"

  attributes(
    :accepting_responses,
    :config,
    :results,
    :trigger_type,
    :trigger_conditions,
    name: { type: :string },
  )

  belongs_to :interaction_ui_template, serializer: InteractionUiTemplates::PersistedSerializer
end
