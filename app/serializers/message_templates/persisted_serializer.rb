class MessageTemplates::PersistedSerializer < MessageTemplateSerializer
  include Persisted
  with_slug
end
