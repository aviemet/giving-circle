# == Schema Information
#
# Table name: presentation_messages
#
#  id                  :uuid             not null, primary key
#  body                :text             default(""), not null
#  delivery_results    :jsonb            not null
#  medium              :string           not null
#  name                :string           not null
#  slug                :string           not null
#  status              :string           default("ready"), not null
#  subject             :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  integration_id      :uuid
#  message_template_id :uuid
#  presentation_id     :uuid             not null
#  skip_interaction_id :uuid
#
# Indexes
#
#  index_presentation_messages_on_integration_id            (integration_id)
#  index_presentation_messages_on_message_template_id       (message_template_id)
#  index_presentation_messages_on_presentation_id           (presentation_id)
#  index_presentation_messages_on_presentation_id_and_slug  (presentation_id,slug) UNIQUE
#  index_presentation_messages_on_skip_interaction_id       (skip_interaction_id)
#
# Foreign Keys
#
#  fk_rails_...  (integration_id => integrations.id)
#  fk_rails_...  (message_template_id => message_templates.id)
#  fk_rails_...  (presentation_id => presentations.id)
#  fk_rails_...  (skip_interaction_id => presentation_interactions.id)
#
class Presentation::MessageSerializer < ApplicationSerializer
  object_as :presentation_message, model: "Presentation::Message"

  identifier :slug

  attributes(
    :name,
    :medium,
    :subject,
    :body,
    :status,
    :integration_id,
    :message_template_id,
    :skip_interaction_id,
  )

  attribute :delivery_results, type: "Record<string, {
    recipient?: string | null
    status?: string
    code?: string
    error_message?: string
    skip_reason?: string
    provider_message_id?: string
  }>" do
    results = @object.delivery_results
    results.is_a?(Hash) ? results : {}
  end
end
