class Templates::PersistedSerializer < TemplateSerializer
  include Persisted

  attributes(
    :slug,
  )

  has_one :circle, serializer: Circles::PersistedSerializer
end
