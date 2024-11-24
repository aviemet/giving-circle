class Presentation::Elements::ShowSerializer < Presentation::Elements::PersistedSerializer
  has_many :presentations, serializer: Presentations::PersistedSerializer
end
