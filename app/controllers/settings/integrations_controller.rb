module Admin
  class Settings::IntegrationsController < Settings::CircleSettingsController
    # @route GET /settings/:circle_slug/integrations (settings_integrations)
    def index
      render inertia: "Settings/Integrations/Index"
    end

    # @route PATCH /settings/:circle_slug/integrations (settings_integrations)
    def update
    end
  end
end
