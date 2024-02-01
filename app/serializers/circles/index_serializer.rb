class Circles::IndexSerializer < CircleSerializer
  attributes(
    :slug,
    :id,
    :updated_at,
    :created_at,
  )

  has_many :themes, serializer: Themes::IndexSerializer
end
