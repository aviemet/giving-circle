class InteractionConfigTemplates::IndexSerializer < InteractionConfigTemplates::PersistedSerializer
  belongs_to :circle, serializer: Circles::PersistedSerializer
end
