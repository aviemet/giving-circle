module Admin
  class Settings::TemplatesController < Settings::CircleSettingsController
    include FriendlyIdHistory
    historical_slug_redirect_values Template, :slug

    expose :templates, -> { search(circle.templates.includes_associated) }
    expose(
      :template,
      id: -> { params[:slug] },
      scope: -> { circle.templates.includes_associated },
      find: ->(id, scope) { scope.friendly.find(id) },
    )

    strong_params :template, permit: [:name, images: [], slides: [
      :slide_index, slide: [
        :id, :name, :order, :data
      ],
    ]]

    sortable_fields %w(name)

    # @route GET /settings/:circle_slug/templates (settings_templates)
    def index
      paginated_templates = paginate(templates, :templates)

      render inertia: "Templates/Index", props: {
        templates: -> { paginated_templates.render(:index) },
        themes: -> { circle.themes.order(:name).includes(:circle).render(:index) },
        pagination: -> { {
          count: templates.size,
          **pagination_data(paginated_templates)
        } },
        circle: -> { circle.render(:options) },
      }
    end

    # @route GET /settings/:circle_slug/templates/:slug (settings_template)
    def show
      render inertia: "Templates/Show", props: {
        template: -> { template.render(:show) }
      }
    end

    # @route GET /settings/:circle_slug/templates/new (new_settings_template)
    def new
      template = Template.create({
        name: "New Template",
        circle: circle
      })

      redirect_to edit_settings_template_url(circle_slug: circle.slug, slug: template.slug)
    end

    # @route GET /settings/:circle_slug/templates/:slug/edit (edit_settings_template)
    def edit
      render inertia: "Templates/Edit", props: {
        template: template.render(:edit)
      }
    end

    # @route POST /settings/:circle_slug/templates (settings_templates)
    def create
      template = Template.new(template_params)
      template.circle = circle

      if template.save
        redirect_to edit_settings_template_path(circle.slug, template), notice: t("templates.notices.created")
      else
        redirect_to new_settings_template_path(circle.slug), inertia: { errors: template.errors }
      end
    end

    # @route PATCH /settings/:circle_slug/templates/:slug (settings_template)
    # @route PUT /settings/:circle_slug/templates/:slug (settings_template)
    def update
      if template.update(template_params)
        redirect_to edit_settings_template_path(circle, template), notice: t("templates.notices.updated")
      else
        redirect_to edit_settings_template_path(circle, template), inertia: { errors: template.errors }
      end
    end

    # @route DELETE /settings/:circle_slug/templates/:slug (settings_template)
    def destroy
      template.destroy!
      redirect_to settings_templates_path(circle), notice: t("templates.notices.destroyed")
    end
  end
end
