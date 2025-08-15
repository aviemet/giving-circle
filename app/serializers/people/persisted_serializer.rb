class People::PersistedSerializer < PersonSerializer
  include Persisted
  with_slug
end
