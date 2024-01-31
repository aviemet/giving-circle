class Circles::ShowSerializer < CircleSerializer
  attributes(
    :slug,
    :id,
    :updated_at,
    :created_at,
  )
end
