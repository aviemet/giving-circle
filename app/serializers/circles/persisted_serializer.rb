class Circles::PersistedSerializer < CircleSerializer
  include Persisted
  with_slug
end
