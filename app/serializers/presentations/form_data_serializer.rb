class Presentations::FormDataSerializer < PresentationSerializer
  has_many :slides, serializer: Slides::FormDataSerializer
end
