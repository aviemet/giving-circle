class PresentationTemplates::ShowSerializer < PresentationTemplateSerializer
  attributes(
    :id,
    :slug,
    :updated_at,
    :created_at,
  )
end
