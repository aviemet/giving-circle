class Themes::PersistedSerializer < ThemeSerializer
  include Persisted

  attributes(
    :slug,
  )
end
