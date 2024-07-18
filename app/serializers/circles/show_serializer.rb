class Circles::ShowSerializer < CircleSerializer
  include Persisted

  attributes(
    :slug,
  )

  has_many :themes, serializer: Themes::ShallowSerializer
  has_many :members, serializer: Members::ShallowSerializer
end
