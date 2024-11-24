class Presentation::Slides::PersistedSerializer < Presentation::SlideSerializer
  include Persisted

  attributes(
    :id,
  )
end
