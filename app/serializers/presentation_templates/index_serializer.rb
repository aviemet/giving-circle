class PresentationTemplates::IndexSerializer < PresentationTemplateSerializer
  attributes(
    :id,
    :slug,
    :updated_at,
    :created_at,
  )

  belongs_to :circle, serializer: Circles::PersistedSerializer
end
