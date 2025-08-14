class TemplatesController < ApplicationController
  include FriendlyIdHistory
  historical_slug_redirect_values Template, :slug

  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug

  expose :templates, -> { search(circle.templates.includes_associated) }
  expose(
    :template,
    id: -> { params[:slug] },
    scope: ->(scope){ scope.includes_associated },
    find: ->(id, scope) { scope.friendly.find(id) },
  )

  strong_params :template, permit: [:name, images: [], slides: [
    :slide_index, slide: [
      :id, :name, :order, :data
    ],
  ]]

  sortable_fields %w(name)

  # @route GET /:circle_slug/templates (circle_templates)
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

  # @route GET /:circle_slug/templates/:slug (circle_template)
  def show
    authorize template

    render inertia: "Templates/Show", props: {
      template: -> { template.render(:show) }
    }
  end

  # @route GET /:circle_slug/templates/new (new_circle_template)
  def new
    authorize Presentation.new

    template = Template.create({
      name: "New Template",
      circle: circle
    })

    redirect_to edit_circle_template_url(circle_slug: circle.slug, slug: template.slug)
  end

  # @route GET /:circle_slug/templates/:slug/edit (edit_circle_template)
  def edit
    authorize template

    render inertia: "Templates/Edit", props: {
      template: template.render(:edit)
    }
  end

  # @route POST /:circle_slug/templates (circle_templates)
  def create
    authorize Template.new

    template = Template.new(template_params)
    template.circle = circle

    if template.save
      redirect_to edit_circle_template_path(circle.slug, template.id), notice: "Template was successfully created."
    else
      redirect_to new_circle_template_path(circle.slug, template.id), inertia: { errors: template.errors }
    end
  end

  # @route PATCH /:circle_slug/templates/:slug (circle_template)
  # @route PUT /:circle_slug/templates/:slug (circle_template)
  def update
    authorize template

    if template.update(template_params)
      redirect_to edit_circle_template_path(circle, template), notice: "Template was successfully updated."
    else
      redirect_to edit_circle_template_path(circle, template), inertia: { errors: template.errors }
    end
  end

  # @route DELETE /:circle_slug/templates/:slug (circle_template)
  def destroy
    authorize template

    template.destroy!
    redirect_to circle_templates_path(circle), notice: "Template was successfully destroyed."
  end

end
