class PresentationTemplates::IndexSerializer < PresentationTemplateSerializer
  attributes(
    :id,
    :updated_at,
    :created_at,
  )

  belongs_to :circle, serializer: Circles::ShareSerializer
end
