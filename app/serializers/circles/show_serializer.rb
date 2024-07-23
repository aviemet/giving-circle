class Circles::ShowSerializer < Circles::PersistedSerializer
  has_many :themes, serializer: Themes::PersistedSerializer
  has_many :members, serializer: Members::PersistedSerializer
end
