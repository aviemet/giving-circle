class Api::PresentationsController < Api::ApiController
  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug

  expose :presentations, -> { search(circle.presentations.includes_associated) }
  expose(
    :presentation,
    id: -> { params[:slug] || params[:presentation_slug] },
    scope: -> { circle.presentations.includes_associated },
    find_by: :slug,
  )

  strong_params :presentation, permit: [:name, :theme_id]

  # @route PATCH /api/circles/:circle_slug/presentations/:slug/sync_slides (sync_slides_api_circle_presentation)
  def sync_slides
    authorize presentation, :update?

    if presentation.sync_template_slides
      render json: {}, status: :ok
    else
      render json: { error: "Failed to sync slides" }, status: :unprocessable_content
    end
  end

  # @route POST /api/circles/:circle_slug/presentations (api_circle_presentations)
  def create
  end

  # @route PATCH /api/circles/:circle_slug/presentations/:slug (api_circle_presentation)
  # @route PUT /api/circles/:circle_slug/presentations/:slug (api_circle_presentation)
  def update
  end

  # @route DELETE /api/circles/:circle_slug/presentations/:slug (api_circle_presentation)
  def destroy
  end
end
