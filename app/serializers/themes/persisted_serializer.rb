class Themes::PersistedSerializer < ThemeSerializer
  include Persisted
  with_slug

  belongs_to :circle, serializer: Circles::OptionsSerializer
end
