class Circles::InertiaShareSerializer < Circles::PersistedSerializer
  has_many :themes, serializer: Themes::InertiaShareSerializer

  has_one :settings, serializer: Circles::SettingsSerializer
end
