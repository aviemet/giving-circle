class InteractionUiTemplates::PersistedSerializer < InteractionUiTemplateSerializer
  include Persisted
  with_slug
end
