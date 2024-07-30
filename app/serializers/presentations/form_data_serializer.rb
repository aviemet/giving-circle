class Presentations::FormDataSerializer < PresentationSerializer
  has_many :slides, serializer: PresentationSlides::PersistedSerializer
end
