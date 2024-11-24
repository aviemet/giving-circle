class Presentation::Votes::ShowSerializer < Presentation::Votes::PersistedSerializer
  has_many :presentations, serializer: Presentations::PersistedSerializer
end
