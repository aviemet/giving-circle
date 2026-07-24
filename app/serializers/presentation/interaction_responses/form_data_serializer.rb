class Presentation::InteractionResponses::FormDataSerializer < Presentation::InteractionResponseSerializer
  has_many :memberships, serializer: Memberships::PersistedSerializer do
    interaction = @object.presentation_interaction
    interaction ? interaction.presentation.memberships : Membership.none
  end

  attribute :context do
    interaction = @object.presentation_interaction
    next {} unless interaction&.presentation

    Presentation::Interaction::ContextLoader.load(interaction)
  end
end
