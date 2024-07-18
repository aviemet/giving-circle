class Circles::IndexSerializer < CircleSerializer
  include Persisted

  attributes(
    :slug,
  )

  has_many :themes, serializer: Themes::IndexSerializer
end
