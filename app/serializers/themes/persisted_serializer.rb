class Themes::PersistedSerializer < ThemeSerializer
  include Persisted
  with_slug
end
