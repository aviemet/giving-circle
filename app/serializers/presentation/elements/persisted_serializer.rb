class Presentation::Elements::PersistedSerializer < Presentation::ElementSerializer
  include Persisted
  with_slug
end
