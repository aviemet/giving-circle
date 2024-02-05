class Presentations::ShallowSerializer < PresentationSerializer
  attributes(
    :id,
    :updated_at,
    :created_at,
  )
end
