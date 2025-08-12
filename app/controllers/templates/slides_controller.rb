class Templates::SlidesController < ApplicationController
  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug

  expose :template, id: -> { params[:template_slug] }, scope: ->(scope){ scope.includes_associated }, find_by: :slug

  expose :slides, -> { template.slides.includes_associated }
  expose :slide, id: -> { params[:slug] }, scope: -> { template.slides }, find_by: :slug

  strong_params :slide, permit: [:name, :data]

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

  # @route POST /:circle_slug/templates/:template_slug/slides (circle_templates_create_slide)
  def create
    authorize Slide.new

    if slide.save
      redirect_to [slide], notice: t("slides.notices.created")
    else
      redirect_to new_slide_path, inertia: { errors: slide.errors }
    end
  end

  def update
    authorize slide

    if slide.update(slide_params)
      redirect_to slide, notice: t("slides.notices.updated")
    else
      redirect_to edit_slide_path, inertia: { errors: slide.errors }
    end
  end

  def destroy
  end
end
