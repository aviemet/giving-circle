class Presentations::PresentationSerializer < Presentations::PersistedSerializer
  has_many :slides, serializer: Slides::ShowSerializer
end
