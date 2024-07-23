class Circles::IndexSerializer < Circles::PersistedSerializer
  has_many :themes, serializer: Themes::PersistedSerializer
end
