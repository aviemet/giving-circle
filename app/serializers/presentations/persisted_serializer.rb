class Presentations::PersistedSerializer < PresentationSerializer
  include Persisted
  with_slug
end
