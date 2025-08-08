class Presentations::ActionResponsesController < ApplicationController
  expose :presentation_action_responses, -> { search(Presentation::ActionResponse.includes_associated) }
  expose :presentation_action_response, find: ->(id, scope){ scope.includes_associated.find(id) }

  strong_params :presentation_action_response, permit: [:presentation_action_id, :membership_id, :response_data]

  sortable_fields %w(presentation_action_id membership_id response_data)

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/action_responses (theme_presentations_action_responses)
  def index
    authorize presentation_action_responses

    paginated_presentation_action_responses = paginate(presentation_action_responses, :presentation_action_responses)

    render inertia: "Presentation::ActionResponses/Index", props: {
      presentation_action_responses: -> { paginated_presentation_action_responses.render(:index) },
      pagination: -> { {
        count: presentation_action_responses.size,
        **pagination_data(paginated_presentation_action_responses)
      } },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/action_responses/:id (theme_presentations_action_response)
  def show
    authorize presentation_action_response
    render inertia: "Presentation::ActionResponses/Show", props: {
      presentation_action_response: -> { presentation_action_response.render(:show) }
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/action_responses/new (new_theme_presentations_action_response)
  def new
    authorize Presentation::ActionResponse.new
    render inertia: "Presentation::ActionResponses/New", props: {
      presentation_action_response: Presentation::ActionResponse.new.render(:form_data)
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/action_responses/:id/edit (edit_theme_presentations_action_response)
  def edit
    authorize presentation_action_response
    render inertia: "Presentation::ActionResponses/Edit", props: {
      presentation_action_response: presentation_action_response.render(:edit)
    }
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/action_responses (theme_presentations_action_responses)
  def create
    authorize Presentation::ActionResponse.new
    if presentation_action_response.save
      redirect_to presentation_action_response, notice: "Action response was successfully created."
    else
      redirect_to new_presentation_action_response_path, inertia: { errors: presentation_action_response.errors }
    end
  end

  # @route PATCH /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/action_responses/:id (theme_presentations_action_response)
  # @route PUT /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/action_responses/:id (theme_presentations_action_response)
  def update
    authorize presentation_action_response
    if presentation_action_response.update(presentation_action_response_params)
      redirect_to presentation_action_response, notice: "Action response was successfully updated."
    else
      redirect_to edit_presentation_action_response_path, inertia: { errors: presentation_action_response.errors }
    end
  end

  # @route DELETE /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/action_responses/:id (theme_presentations_action_response)
  def destroy
    authorize presentation_action_response
    presentation_action_response.destroy!
    redirect_to presentation_action_responses_url, notice: "Action response was successfully destroyed."
  end

end
