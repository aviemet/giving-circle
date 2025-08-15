class Circles::InertiaShareSerializer < Circles::PersistedSerializer
  has_many :themes, serializer: Themes::InertiaShareSerializer
end
