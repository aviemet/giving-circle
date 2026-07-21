class InteractionConfigTemplatesController < ApplicationController
  include FriendlyIdHistory
  historical_slug_redirect_values InteractionConfigTemplate, :slug

  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug

  expose :interaction_config_templates, -> {
    search(circle.interaction_config_templates.includes_associated)
  }

  expose(
    :interaction_config_template,
    id: -> { params[:slug] },
    scope: -> { circle.interaction_config_templates.includes_associated },
    find: ->(slug, scope) { scope.friendly.find(slug) },
  )

  strong_params :interaction_config_template, permit: [
    :name,
    { config: {} },
  ]

  sortable_fields %w(name slug)

  # @route GET /:circle_slug/interaction_templates (circle_interaction_templates)
  def index
    authorize interaction_config_templates

    paginated_templates = paginate(interaction_config_templates, :interaction_config_templates)

    render inertia: "InteractionConfigTemplates/Index", props: {
      interaction_config_templates: -> { paginated_templates.render(:index) },
      pagination: -> { {
        count: interaction_config_templates.size,
        **pagination_data(paginated_templates)
      } },
      circle: -> { circle.render(:options) },
    }
  end

  # @route GET /:circle_slug/interaction_templates/new (new_circle_interaction_template)
  def new
    authorize InteractionConfigTemplate.new

    render inertia: "InteractionConfigTemplates/New", props: {
      interaction_config_template: InteractionConfigTemplate.new.render(:form_data),
    }
  end

  # @route GET /:circle_slug/interaction_templates/:slug/edit (edit_circle_interaction_template)
  def edit
    authorize interaction_config_template

    render inertia: "InteractionConfigTemplates/Edit", props: {
      interaction_config_template: interaction_config_template.render(:edit),
    }
  end

  # @route POST /:circle_slug/interaction_templates (circle_interaction_templates)
  def create
    authorize InteractionConfigTemplate.new

    interaction_config_template.circle = circle

    if interaction_config_template.save
      redirect_to edit_circle_interaction_template_path(circle, interaction_config_template),
        notice: t("interaction_config_templates.notices.created")
    else
      redirect_to new_circle_interaction_template_path(circle),
        inertia: { errors: interaction_config_template.errors }
    end
  end

  # @route PATCH /:circle_slug/interaction_templates/:slug (circle_interaction_template)
  # @route PUT /:circle_slug/interaction_templates/:slug (circle_interaction_template)
  def update
    authorize interaction_config_template

    if interaction_config_template.update(interaction_config_template_params)
      redirect_to edit_circle_interaction_template_path(circle, interaction_config_template),
        notice: t("interaction_config_templates.notices.updated")
    else
      redirect_to edit_circle_interaction_template_path(circle, interaction_config_template),
        inertia: { errors: interaction_config_template.errors }
    end
  end

  # @route DELETE /:circle_slug/interaction_templates/:slug (circle_interaction_template)
  def destroy
    authorize interaction_config_template

    interaction_config_template.destroy!
    redirect_to circle_interaction_templates_path(circle), notice: t("interaction_config_templates.notices.destroyed")
  end
end
