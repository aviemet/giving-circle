class Presentation::InteractionResponses::ShowSerializer < Presentation::InteractionResponses::PersistedSerializer
  belongs_to :membership, serializer: Memberships::PersistedSerializer
end
