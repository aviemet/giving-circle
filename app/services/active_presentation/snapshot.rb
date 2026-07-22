module ActivePresentation
  class Snapshot
    def self.call(presentation)
      {
        interactions: presentation.interactions.order(:created_at).map { |interaction|
          {
            id: interaction.id,
            slug: interaction.slug,
            accepting_responses: interaction.accepting_responses,
          }
        },
      }
    end
  end
end
