class Circles::EditSerializer < CircleSerializer
  include Persisted

  attributes(
    :slug,
  )
end
