class Members::ShowSerializer < Members::PersistedSerializer
  has_many :themes, serializer: Themes::PersistedSerializer
end
