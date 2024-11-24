class Presentation::Distributions::ShowSerializer < Presentation::Distributions::PersistedSerializer
  has_many :presentations, serializer: Presentations::PersistedSerializer
end
