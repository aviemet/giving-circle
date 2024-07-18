class Circles::IndexSerializer < CircleSerializer
  include Persisted

  attributes(
    :slug,
  )
end
