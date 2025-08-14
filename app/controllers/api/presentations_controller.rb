class Api::PresentationsController < Api::ApiController
  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug
  expose :theme, id: -> { params[:theme_slug] }, find_by: :slug

  expose :presentations, -> { search(theme.presentations.includes_associated) }
  expose(
    :presentation,
    id: -> { params[:presentation_slug] },
    scope: ->(scope) { scope.presentations.includes_associated },
    find: ->(id, scope) { scope.friendly.find(id) },
  )

  strong_params :presentation, permit: [:name, :theme_id]

  # @route PATCH /api/circles/:circle_slug/presentations/:presentation_slug/sync_slides (api_circle_presentation_sync_slides)
  # @route PUT /api/circles/:circle_slug/presentations/:presentation_slug/sync_slides (api_circle_presentation_sync_slides)
  def sync_slides
    authorize presentation

    if presentation.sync_template_slides
      render json: {}, status: :ok
    else
      render json: { error: "Failed to sync slides" }, status: :unprocessable_content
    end
  end

  # @route POST /api/circles/:circle_slug/presentations (api_circle_presentations)
  def create
  end

  # @route PATCH /api/circles/:circle_slug/presentations/:presentation_slug (api_circle_presentation)
  # @route PUT /api/circles/:circle_slug/presentations/:presentation_slug (api_circle_presentation)
  def update
  end

  # @route DELETE /api/circles/:circle_slug/presentations/:presentation_slug (api_circle_presentation)
  def destroy
  end
end
