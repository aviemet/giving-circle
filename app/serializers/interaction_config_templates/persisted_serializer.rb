class InteractionConfigTemplates::PersistedSerializer < InteractionConfigTemplateSerializer
  include Persisted
  with_slug
end
