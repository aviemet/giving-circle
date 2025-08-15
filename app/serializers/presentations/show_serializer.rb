class Presentations::ShowSerializer < Presentations::PersistedSerializer
  has_many :slides, serializer: Slides::ShowSerializer
end
