class Circles::ShowSerializer < Circles::PersistedSerializer
  has_many :themes, serializer: Themes::PersistedSerializer
  has_many :memberships, serializer: Memberships::PersistedSerializer
end
