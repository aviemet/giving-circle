class Api::Presentations::SlidesController < Api::ApiController
  expose :presentation, id: -> { params[:presentation_slug] }, scope: ->(scope){ scope.includes_associated }, find_by: :slug

  expose :slides, -> { presentation.slides.includes_associated }
  expose :slide, id: -> { params[:slug] }, scope: -> { presentation.slides }, find_by: :slug

  strong_params :slide, permit: [:title, data: {}]

  # @route POST /api/circles/:circle_slug/presentations/:presentation_slug/slides (api_circle_presentation_slides)
  def create
    authorize Slide.new, policy_class: Presentation::SlidePolicy

    slide.presentation = presentation

    if slide.save
      render json: slide, status: :created
    else
      render json: { errors: user.errors }, status: :unprocessable_content
    end
  end

  # @route PATCH /api/circles/:circle_slug/presentations/:presentation_slug/slides/:slug (api_circle_presentation_slide)
  # @route PUT /api/circles/:circle_slug/presentations/:presentation_slug/slides/:slug (api_circle_presentation_slide)
  def update
    authorize slide, policy_class: Presentation::SlidePolicy

    if slide.update(slide_params)
      render json: slide, status: :accepted
    else
      render json: { errors: user.errors }, status: :unprocessable_content
    end
  end

  # @route DELETE /api/circles/:circle_slug/presentations/:presentation_slug/slides/:slug (api_circle_presentation_slide)
  def destroy
    authorize slide, policy_class: Presentation::SlidePolicy
  end
end
