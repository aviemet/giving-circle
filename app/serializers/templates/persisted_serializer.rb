class Templates::PersistedSerializer < TemplateSerializer
  include Persisted
  with_slug

  has_one :circle, serializer: Circles::PersistedSerializer
end
