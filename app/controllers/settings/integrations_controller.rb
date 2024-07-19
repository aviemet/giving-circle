module Admin
  class Settings::IntegrationsController < ApplicationController

    # @route GET /settings/integrations {export: true} (settings_integrations)
    def index
      render inertia: "Settings/Integrations/Index"
    end

    # @route PATCH /settings/integrations {export: true} (settings_integrations)
    def update
    end
  end
end
