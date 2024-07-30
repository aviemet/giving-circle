class PresentationSlides::PersistedSerializer < PresentationSlideSerializer
  include Persisted

  attributes(
    :slug,
  )
end
