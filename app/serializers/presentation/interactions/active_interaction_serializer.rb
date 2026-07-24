class Presentation::Interactions::ActiveInteractionSerializer < Presentation::Interactions::PersistedSerializer
  attribute :context do
    next {} unless @object.presentation

    Presentation::Interaction::ContextLoader.load(@object)
  end
end
