class Slides::PersistedSerializer < SlideSerializer
  include Persisted

  attributes(
    :slug,
  )
end
