module Admin
  class Settings::IntegrationsController < AdminController

    # @route GET /admin/settings/integrations (settings_integrations)
    def index
      render inertia: "Settings/Integrations/Index"
    end

    # @route PATCH /admin/settings/integrations (settings_integrations)
    def update
    end
  end
end
