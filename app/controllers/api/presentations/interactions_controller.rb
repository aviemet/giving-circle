class Api::Presentations::InteractionsController < Api::ApiController
  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug
  expose :presentation,
    id: -> { params[:presentation_slug] },
    scope: -> { circle.presentations },
    find_by: :slug

  expose :presentation_interaction,
    model: "Presentation::Interaction",
    scope: -> { presentation.interactions },
    id: -> { params[:slug] },
    find: ->(slug, scope) { scope.friendly.find(slug) }

  strong_params :presentation_interaction, permit: [:accepting_responses]

  # @route PATCH /api/circles/:circle_slug/presentations/:presentation_slug/interactions/:slug (api_circle_presentation_interaction)
  # @route PUT /api/circles/:circle_slug/presentations/:presentation_slug/interactions/:slug (api_circle_presentation_interaction)
  def update
    authorize presentation_interaction, policy_class: Presentation::InteractionPolicy

    accepting = presentation_interaction_params[:accepting_responses]
    if accepting.nil?
      render json: { errors: { accepting_responses: ["is required"] } }, status: :unprocessable_content
      return
    end

    if ActiveModel::Type::Boolean.new.cast(accepting)
      presentation_interaction.open_responses!
    else
      presentation_interaction.close_responses!
    end

    ActivePresentation::Cache.schedule_refresh(presentation.id)

    render json: {
      interaction: {
        id: presentation_interaction.id,
        slug: presentation_interaction.slug,
        name: presentation_interaction.name,
        accepting_responses: presentation_interaction.accepting_responses,
      },
      interactions: presentation.interactions.order(:created_at).map { |interaction|
        {
          id: interaction.id,
          slug: interaction.slug,
          name: interaction.name,
          accepting_responses: interaction.accepting_responses,
        }
      },
    }, status: :accepted
  end
end
