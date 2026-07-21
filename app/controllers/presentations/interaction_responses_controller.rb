class Presentations::InteractionResponsesController < ApplicationController
  expose :presentation, id: -> { params[:presentation_slug] }, find_by: :slug

  expose :presentation_interaction,
    model: "Presentation::Interaction",
    scope: -> { presentation.interactions },
    id: -> { params[:interaction_slug] },
    find: ->(slug, scope) { scope.includes_associated.friendly.find(slug) }

  expose :presentation_interaction_responses, -> {
    search(presentation_interaction.interaction_responses.includes_associated)
  }

  expose :presentation_interaction_response,
    scope: -> { presentation_interaction.interaction_responses.includes_associated },
    find: ->(id, scope) { scope.find(id) }

  strong_params :presentation_interaction_response, permit: [
    :membership_id,
    { response_data: {} },
  ]

  sortable_fields %w(membership_id response_data)

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:interaction_slug/responses (theme_presentation_interaction_responses)
  def index
    authorize presentation_interaction_responses, policy_class: Presentation::InteractionResponsePolicy

    paginated_responses = paginate(presentation_interaction_responses, :presentation_interaction_responses)

    render inertia: "Presentations/InteractionResponses/Index", props: {
      presentation_interaction: -> { presentation_interaction.render(:show) },
      presentation_interaction_responses: -> { paginated_responses.render(:index) },
      pagination: -> { {
        count: presentation_interaction_responses.size,
        **pagination_data(paginated_responses)
      } },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:interaction_slug/responses/:id (theme_presentation_interaction_response)
  def show
    authorize presentation_interaction_response, policy_class: Presentation::InteractionResponsePolicy
    render inertia: "Presentations/InteractionResponses/Show", props: {
      presentation_interaction: -> { presentation_interaction.render(:show) },
      presentation_interaction_response: -> { presentation_interaction_response.render(:show) },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:interaction_slug/responses/new (new_theme_presentation_interaction_response)
  def new
    authorize Presentation::InteractionResponse.new, policy_class: Presentation::InteractionResponsePolicy
    response = presentation_interaction.interaction_responses.build
    render inertia: "Presentations/InteractionResponses/New", props: {
      presentation_interaction: -> { presentation_interaction.render(:show) },
      presentation_interaction_response: response.render(:form_data),
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:interaction_slug/responses/:id/edit (edit_theme_presentation_interaction_response)
  def edit
    authorize presentation_interaction_response, policy_class: Presentation::InteractionResponsePolicy
    render inertia: "Presentations/InteractionResponses/Edit", props: {
      presentation_interaction: -> { presentation_interaction.render(:show) },
      presentation_interaction_response: presentation_interaction_response.render(:edit),
    }
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:interaction_slug/responses (theme_presentation_interaction_responses)
  def create
    authorize Presentation::InteractionResponse.new, policy_class: Presentation::InteractionResponsePolicy

    response = presentation_interaction.interaction_responses.build(presentation_interaction_response_params)

    if response.save
      redirect_to theme_presentation_interaction_response_path(
        presentation.circle,
        presentation.theme,
        presentation,
        presentation_interaction,
        response,
      ), notice: t("presentations.interaction_responses.notices.created")
    else
      redirect_to new_theme_presentation_interaction_response_path(
        presentation.circle,
        presentation.theme,
        presentation,
        presentation_interaction,
      ), inertia: { errors: response.errors }
    end
  end

  # @route PATCH /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:interaction_slug/responses/:id (theme_presentation_interaction_response)
  # @route PUT /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:interaction_slug/responses/:id (theme_presentation_interaction_response)
  def update
    authorize presentation_interaction_response, policy_class: Presentation::InteractionResponsePolicy
    if presentation_interaction_response.update(presentation_interaction_response_params)
      redirect_to theme_presentation_interaction_response_path(
        presentation.circle,
        presentation.theme,
        presentation,
        presentation_interaction,
        presentation_interaction_response,
      ), notice: t("presentations.interaction_responses.notices.updated")
    else
      redirect_to edit_theme_presentation_interaction_response_path(
        presentation.circle,
        presentation.theme,
        presentation,
        presentation_interaction,
        presentation_interaction_response,
      ), inertia: { errors: presentation_interaction_response.errors }
    end
  end

  # @route DELETE /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:interaction_slug/responses/:id (theme_presentation_interaction_response)
  def destroy
    authorize presentation_interaction_response, policy_class: Presentation::InteractionResponsePolicy
    presentation_interaction_response.destroy!
    redirect_to theme_presentation_interaction_responses_path(
      presentation.circle,
      presentation.theme,
      presentation,
      presentation_interaction,
    ), notice: t("presentations.interaction_responses.notices.destroyed")
  end

end
