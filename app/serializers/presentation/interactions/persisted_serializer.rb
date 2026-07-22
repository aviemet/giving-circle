class Presentation::Interactions::PersistedSerializer < Presentation::InteractionSerializer
  include Persisted
  with_slug
end
