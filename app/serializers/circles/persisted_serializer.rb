class Circles::PersistedSerializer < CircleSerializer
  include Persisted

  attributes(
    :slug,
  )
end
