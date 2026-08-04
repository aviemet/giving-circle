require "rails_helper"

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
RSpec.describe Presentation::Message, type: :model do
  it "copies fields from a template" do
    presentation = create(:presentation)
    template = create(:message_template, circle: presentation.circle, name: "Pledge reminder")

    message = described_class.copy_from_template!(presentation: presentation, message_template: template)

    expect(message.name).to eq("Pledge reminder")
    expect(message.medium).to eq(template.medium)
    expect(message.body).to eq(template.body)
    expect(message.status).to eq("ready")
  end

  it "does not change medium after create" do
    message = create(:presentation_message, medium: "email")

    message.update(medium: "sms", subject: nil)

    expect(message.reload.medium).to eq("email")
  end
end
