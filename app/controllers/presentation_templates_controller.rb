class PresentationTemplatesController < ApplicationController
  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug

  expose :templates, -> { search(Presentation.templates.includes_associated) }
  expose :template, model: Presentation, scope: ->(scope){ scope.templates.includes_associated }, id: -> { params[:slug] }, find_by: :slug

  strong_params :template, permit: [:name]

  sortable_fields %w(name)

  # @route GET /:circle_slug/presentation_templates (circle_presentation_templates)
  def index
    authorize templates

    paginated_templates = paginate(templates, :templates)

    render inertia: "Templates/Index", props: {
      templates: -> { paginated_templates.render(:index) },
      pagination: -> { {
        count: templates.size,
        **pagination_data(paginated_templates)
      } },
      circle: -> { Circle.find_by(slug: params[:circle_slug]).render(:options) },
    }
  end

  # @route GET /:circle_slug/presentation_templates/:slug (circle_presentation_template)
  def show
    authorize template

    render inertia: "Templates/Show", props: {
      template: -> { template.render(:show) }
    }
  end

  # @route GET /:circle_slug/presentation_templates/new (new_circle_presentation_template)
  def new
    authorize Presentation.new

    render inertia: "Templates/New", props: {
      template: PresentationTemplate.new.render(:form_data),
      circle: -> { Circle.find_by(slug: params[:circle_slug]).render(:options) },
    }
  end

  # @route GET /:circle_slug/presentation_templates/:slug/edit (edit_circle_presentation_template)
  def edit
    authorize template

    render inertia: "Templates/Edit", props: {
      template: template.render(:edit)
    }
  end

  # @route POST /:circle_slug/presentation_templates (circle_presentation_templates)
  def create
    authorize Presentation.new

    template = Presentation.new(template_params)
    template.template = true
    template.circle = circle

    if template.save
      redirect_to edit_circle_presentation_template_path(circle.slug, template.id), notice: "Template was successfully created."
    else
      redirect_to new_circle_presentation_template_path(circle.slug, template.id), inertia: { errors: template.errors }
    end
  end

  # @route PATCH /:circle_slug/presentation_templates/:slug (circle_presentation_template)
  # @route PUT /:circle_slug/presentation_templates/:slug (circle_presentation_template)
  def update
    authorize template

    if template.update(presentation_template_params)
      redirect_to template, notice: "Template was successfully updated."
    else
      redirect_to edit_circle_presentation_template_path(circle.slug, template.id), inertia: { errors: template.errors }
    end
  end

  # @route DELETE /:circle_slug/presentation_templates/:slug (circle_presentation_template)
  def destroy
    authorize template

    template.destroy!
    redirect_to templates_url, notice: "Template was successfully destroyed."
  end
end
