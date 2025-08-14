class Slides::PersistedSerializer < SlideSerializer
  include Persisted
  with_slug
end
