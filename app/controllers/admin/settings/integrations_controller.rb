module Admin
  class Settings::IntegrationsController < AdminController

    # @route GET /admin/settings/integrations (admin_settings_integrations)
    # @route GET /admin/settings/mail
    def index
      render inertia: "Settings/Integrations/Index"
    end

    # @route PATCH /admin/settings/integrations/:id (admin_settings_integration)
    # @route PUT /admin/settings/integrations/:id (admin_settings_integration)
    # @route PATCH /admin/settings/mail/:id
    # @route PUT /admin/settings/mail/:id
    def update
    end
  end
end
