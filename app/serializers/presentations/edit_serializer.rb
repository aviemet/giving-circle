class Presentations::EditSerializer < Presentations::PersistedSerializer
  has_many :slides, serializer: Slides::EditSerializer
end
