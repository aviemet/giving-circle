class Templates::SlidesController < ApplicationController
  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug

  expose :template, id: -> { params[:template_slug] }, scope: ->(scope){ scope.includes_associated }, find_by: :slug

  expose :slides, -> { template.slides.includes_associated }
  expose :slide, id: -> { params[:slug] }, scope: -> { template.slides }, find_by: :slug

  strong_params :slide, permit: [:name]

  sortable_fields %w(name)

  def index
    render inertia: "Templates/Slides/Index"
  end

  def show
    render inertia: "Templates/Slides/Show"
  end

  def new
    render inertia: "Templates/Slides/New"
  end

  # @route GET /:circle_slug/templates/:template_slug/slides/:slug/edit (circle_templates_edit_slide)
  def edit
    render inertia: "Slides/Edit", props: {
      template: template.render(:persisted),
      slide: slide.render(:form_data)
    }
  end

  def create
  end

  def update
  end

  def destroy
  end
end
