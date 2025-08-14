class Themes::InertiaShareSerializer < Themes::PersistedSerializer
  include Persisted
  with_slug

  attributes(
    :name,
  )
end
