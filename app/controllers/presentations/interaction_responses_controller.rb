class Presentations::InteractionResponsesController < ApplicationController
  expose :presentation_interaction_responses, -> { search(Presentation::InteractionResponse.includes_associated) }
  expose :presentation_interaction_response, find: ->(id, scope){ scope.includes_associated.find(id) }

  strong_params :presentation_interaction_response, permit: [:presentation_action_id, :membership_id, :response_data]

  sortable_fields %w(presentation_action_id membership_id response_data)

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interaction_responses (theme_presentation_interaction_responses)
  def index
    authorize presentation_interaction_responses

    paginated_presentation_interaction_responses = paginate(presentation_interaction_responses, :presentation_interaction_responses)

    render inertia: "Presentation::InteractionResponses/Index", props: {
      presentation_interaction_responses: -> { paginated_presentation_interaction_responses.render(:index) },
      pagination: -> { {
        count: presentation_interaction_responses.size,
        **pagination_data(paginated_presentation_interaction_responses)
      } },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interaction_responses/:id (theme_presentation_interaction_response)
  def show
    authorize presentation_interaction_response
    render inertia: "Presentation::InteractionResponses/Show", props: {
      presentation_interaction_response: -> { presentation_interaction_response.render(:show) }
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interaction_responses/new (new_theme_presentation_interaction_response)
  def new
    authorize Presentation::InteractionResponse.new
    render inertia: "Presentation::InteractionResponses/New", props: {
      presentation_interaction_response: Presentation::InteractionResponse.new.render(:form_data)
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interaction_responses/:id/edit (edit_theme_presentation_interaction_response)
  def edit
    authorize presentation_interaction_response
    render inertia: "Presentation::InteractionResponses/Edit", props: {
      presentation_interaction_response: presentation_interaction_response.render(:edit)
    }
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interaction_responses (theme_presentation_interaction_responses)
  def create
    authorize Presentation::InteractionResponse.new
    if presentation_interaction_response.save
      redirect_to presentation_interaction_response, notice: "Action response was successfully created."
    else
      redirect_to new_presentation_interaction_response_path, inertia: { errors: presentation_interaction_response.errors }
    end
  end

  # @route PATCH /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interaction_responses/:id (theme_presentation_interaction_response)
  # @route PUT /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interaction_responses/:id (theme_presentation_interaction_response)
  def update
    authorize presentation_interaction_response
    if presentation_interaction_response.update(presentation_interaction_response_params)
      redirect_to presentation_interaction_response, notice: "Action response was successfully updated."
    else
      redirect_to edit_presentation_interaction_response_path, inertia: { errors: presentation_interaction_response.errors }
    end
  end

  # @route DELETE /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interaction_responses/:id (theme_presentation_interaction_response)
  def destroy
    authorize presentation_interaction_response
    presentation_interaction_response.destroy!
    redirect_to presentation_interaction_responses_url, notice: "Action response was successfully destroyed."
  end

end
