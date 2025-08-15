class Templates::ShowSerializer < Templates::PersistedSerializer
  has_many :slides, serializer: Slides::ShowSerializer
end
