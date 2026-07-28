module Admin
  class Settings::InteractionConfigTemplatesController < Settings::CircleSettingsController
    include FriendlyIdHistory
    historical_slug_redirect_values InteractionConfigTemplate, :slug

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
      :interaction_ui_template_id,
      { config: {} },
    ]

    sortable_fields %w(name slug)

    # @route GET /settings/:circle_slug/interaction_templates (settings_interaction_templates)
    def index
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

    # @route GET /settings/:circle_slug/interaction_templates/new (new_settings_interaction_template)
    def new
      render inertia: "InteractionConfigTemplates/New", props: {
        interaction_config_template: InteractionConfigTemplate.new.render(:form_data),
      }
    end

    # @route GET /settings/:circle_slug/interaction_templates/:slug/edit (edit_settings_interaction_template)
    def edit
      render inertia: "InteractionConfigTemplates/Edit", props: {
        interaction_config_template: interaction_config_template.render(:edit),
      }
    end

    # @route POST /settings/:circle_slug/interaction_templates (settings_interaction_templates)
    def create
      interaction_config_template.circle = circle

      if interaction_config_template.save
        redirect_to edit_settings_interaction_template_path(circle, interaction_config_template),
          notice: t("interaction_config_templates.notices.created")
      else
        redirect_to new_settings_interaction_template_path(circle),
          inertia: { errors: interaction_config_template.errors }
      end
    end

    # @route PATCH /settings/:circle_slug/interaction_templates/:slug (settings_interaction_template)
    # @route PUT /settings/:circle_slug/interaction_templates/:slug (settings_interaction_template)
    def update
      if interaction_config_template.update(interaction_config_template_params)
        redirect_to edit_settings_interaction_template_path(circle, interaction_config_template),
          notice: t("interaction_config_templates.notices.updated")
      else
        redirect_to edit_settings_interaction_template_path(circle, interaction_config_template),
          inertia: { errors: interaction_config_template.errors }
      end
    end

    # @route DELETE /settings/:circle_slug/interaction_templates/:slug (settings_interaction_template)
    def destroy
      interaction_config_template.destroy!
      redirect_to settings_interaction_templates_path(circle), notice: t("interaction_config_templates.notices.destroyed")
    end
  end
end
