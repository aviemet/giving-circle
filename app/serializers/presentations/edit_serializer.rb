class Presentations::EditSerializer < Presentations::PersistedSerializer
  has_many :slides, serializer: PresentationSlides::PersistedSerializer
end
