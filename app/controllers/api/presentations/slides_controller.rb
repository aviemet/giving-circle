class Api::Presentations::SlidesController < ApplicationController
  expose :presentation, id: -> { params[:presentation_slug] }, scope: ->(scope){ scope.includes_associated }, find_by: :slug

  expose :slides, -> { presentation.slides.includes_associated }
  expose :slide, id: -> { params[:slug] }, scope: -> { template.slides }, find_by: :slug

  strong_params :slide, permit: [:name, :data]

  # @route POST /api/presentations/:presentation_slug/slides (api_presentation_slides)
  def create
    authorize Slide.new, policy_class: Presentation::SlidePolicy
  end

  # @route PATCH /api/slides/:slug (api_slide)
  # @route PUT /api/slides/:slug (api_slide)
  def update
    authorize slide, policy_class: Presentation::SlidePolicy
  end

  # @route DELETE /api/slides/:slug (api_slide)
  def destroy
    authorize slide, policy_class: Presentation::SlidePolicy
  end
end
