class Presentation::InteractionResponses::IndexSerializer < Presentation::InteractionResponses::PersistedSerializer
  belongs_to :membership, serializer: Memberships::PersistedSerializer
end
