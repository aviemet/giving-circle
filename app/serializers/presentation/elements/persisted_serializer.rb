class Presentation::Elements::PersistedSerializer < Presentation::ElementSerializer
  include Persisted

  attributes(
    :id,
  )
end
