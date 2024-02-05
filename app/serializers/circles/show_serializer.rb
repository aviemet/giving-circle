class Circles::ShowSerializer < CircleSerializer
  attributes(
    :slug,
    :id,
    :updated_at,
    :created_at,
  )

  has_many :themes, serializer: Themes::ShallowSerializer
  has_many :members, serializer: Members::ShallowSerializer
end
