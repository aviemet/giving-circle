class Presentation::Interactions::ActiveInteractionSerializer < Presentation::Interactions::PersistedSerializer
  attribute :context do
    next {} unless @object.presentation

    Interactions::ContextLoader.load(@object)
  end
end
