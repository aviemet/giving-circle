class PresentationTemplates::EditSerializer < PresentationTemplateSerializer

  attributes(
    :id,
    :slug,
    :updated_at,
    :created_at,
  )

  belongs_to :circle, serializer: Circles::ShareSerializer
end
