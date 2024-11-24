class Presentation::Slides::ShowSerializer < Presentation::Slides::PersistedSerializer
  has_many :presentations, serializer: Presentations::PersistedSerializer
end
