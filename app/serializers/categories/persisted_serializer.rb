class Categories::PersistedSerializer < CategorySerializer
  include Persisted
  with_slug
end
