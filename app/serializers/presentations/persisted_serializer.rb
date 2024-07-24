class Presentations::PersistedSerializer < PresentationSerializer
  include Persisted

  attributes(
    :slug,
  )
end
