class Templates::PersistedSerializer < TemplateSerializer
  include Persisted
  with_slug

  belongs_to :circle, serializer: Circles::PersistedSerializer
end
