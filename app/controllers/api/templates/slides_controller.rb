class Api::Templates::SlidesController < Api::ApiController
  expose :template, id: -> { params[:template_slug] }, scope: ->(scope){ scope.includes_associated }, find_by: :slug

  expose :slides, -> { template.slides.includes_associated }
  expose :slide, id: -> { params[:slug] }, scope: -> { template.slides }, find_by: :slug

  strong_params :slide, permit: [:title, data: {}]

  # @route POST /api/circles/:circle_slug/templates/:template_slug/slides (api_circle_template_slides)
  def create
    authorize Slide.new, policy_class: Template::SlidePolicy

    slide.template = template

    if slide.save
      render json: slide, status: :created
    else
      render json: { errors: user.errors }, status: :unprocessable_content
    end
  end

  # @route PATCH /api/circles/:circle_slug/templates/:template_slug/slides/:slug (api_circle_template_slide)
  # @route PUT /api/circles/:circle_slug/templates/:template_slug/slides/:slug (api_circle_template_slide)
  def update
    authorize slide, policy_class: Template::SlidePolicy

    if slide.update(slide_params)
      render json: slide, status: :accepted
    else
      render json: { errors: user.errors }, status: :unprocessable_content
    end
  end

  # @route DELETE /api/circles/:circle_slug/templates/:template_slug/slides/:slug (api_circle_template_slide)
  def destroy
    authorize slide, policy_class: Template::SlidePolicy
  end
end
