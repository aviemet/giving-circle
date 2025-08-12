class Api::Templates::SlidesController < ApplicationController
  expose :template, id: -> { params[:template_slug] }, scope: ->(scope){ scope.includes_associated }, find_by: :slug

  expose :slides, -> { template.slides.includes_associated }
  expose :slide, id: -> { params[:slug] }, scope: -> { template.slides }, find_by: :slug

  strong_params :slide, permit: [:title, :data]

  # @route POST /api/templates/:template_slug/slides (api_template_slides)
  def create
    authorize Slide.new, policy_class: Template::SlidePolicy
    ap({ slide:, template:, params: })

    slide.template = template

    if slide.save
      render json: slide, status: :created
    else
      render json: { errors: user.errors }, status: :partial_content
    end
  end

  # @route PATCH /api/slides/:slug (api_slide)
  # @route PUT /api/slides/:slug (api_slide)
  def update
    authorize slide, policy_class: Template::SlidePolicy

    if slide.save
      render json: slide, status: :created
    else
      render json: { errors: user.errors }, status: :partial_content
    end
  end

  # @route DELETE /api/slides/:slug (api_slide)
  def destroy
    authorize slide, policy_class: Template::SlidePolicy
  end
end
