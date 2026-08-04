class Presentation::Messages::PersistedSerializer < Presentation::MessageSerializer
  include Persisted
  with_slug

  belongs_to :integration, serializer: Integrations::PersistedSerializer, optional: true
  belongs_to :message_template, serializer: MessageTemplates::PersistedSerializer, optional: true
  belongs_to :skip_interaction, serializer: Presentation::Interactions::PersistedSerializer, optional: true
end
