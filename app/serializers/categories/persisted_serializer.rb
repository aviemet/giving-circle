class Categories::PersistedSerializer < CategoriesSerializer
  include Persisted
  with_slug
end
