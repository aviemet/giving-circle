module Admin
  class Settings::IntegrationsController < Settings::CircleSettingsController
    expose :integrations, -> { search(circle.integrations.includes_associated) }
    expose :integration, id: -> { params[:id] }, scope: -> { circle.integrations }

    strong_params :integration, permit: [
      :name,
      :provider,
      :medium,
      :active,
      { credentials: {} },
    ]

    sortable_fields %w(name provider medium active)

    # @route GET /settings/:circle_slug/integrations (settings_integrations)
    def index
      paginated = paginate(integrations, :integrations)

      render inertia: "Settings/Integrations/Index", props: {
        integrations: -> { paginated.render(:index) },
        pagination: -> { {
          count: integrations.size,
          **pagination_data(paginated)
        } },
        circle: -> { circle.render(:options) },
      }
    end

    # @route GET /settings/:circle_slug/integrations/new (new_settings_integration)
    def new
      render inertia: "Settings/Integrations/New", props: {
        integration: Integration.new(provider: "smtp", medium: "email").render(:form_data),
      }
    end

    # @route GET /settings/:circle_slug/integrations/:id/edit (edit_settings_integration)
    def edit
      render inertia: "Settings/Integrations/Edit", props: {
        integration: integration.render(:edit),
      }
    end

    # @route POST /settings/:circle_slug/integrations (settings_integrations)
    def create
      integration.circle = circle

      if integration.save
        redirect_to edit_settings_integration_path(circle, integration),
          notice: t("integrations.notices.created")
      else
        redirect_to new_settings_integration_path(circle),
          inertia: { errors: integration.errors }
      end
    end

    # @route PATCH /settings/:circle_slug/integrations/:id (settings_integration)
    # @route PUT /settings/:circle_slug/integrations/:id (settings_integration)
    def update
      attrs = integration_params.to_h
      incoming = attrs["credentials"] || attrs[:credentials]
      if incoming.is_a?(Hash)
        merged = (integration.credentials || {}).merge(incoming.stringify_keys)
        merged.compact_blank!
        attrs["credentials"] = merged
      end

      if integration.update(attrs)
        redirect_to edit_settings_integration_path(circle, integration),
          notice: t("integrations.notices.updated")
      else
        redirect_to edit_settings_integration_path(circle, integration),
          inertia: { errors: integration.errors }
      end
    end

    # @route DELETE /settings/:circle_slug/integrations/:id (settings_integration)
    def destroy
      integration.destroy!
      redirect_to settings_integrations_path(circle), notice: t("integrations.notices.destroyed")
    end
  end
end
