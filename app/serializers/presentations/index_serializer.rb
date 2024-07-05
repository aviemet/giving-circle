class Presentations::IndexSerializer < PresentationSerializer
  attributes(
    :id,
    :updated_at,
    :created_at,
  )

  belongs_to :theme, serializer: Themes::ShowSerializer
end
