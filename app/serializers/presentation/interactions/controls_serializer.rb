class Presentation::Interactions::ControlsSerializer < ApplicationSerializer
  object_as :presentation_interaction, model: "Presentation::Interaction"

  attributes(
    :accepting_responses,
    name: { type: :string },
  )

  attribute :id, type: :string do
    @object.id
  end

  attribute :slug, type: :string do
    @object.slug
  end
end
