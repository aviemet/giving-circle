module Admin
  class Settings::IntegrationsController < ApplicationController

    # @route GET /settings/integrations (settings_integrations)
    def index
      render inertia: "Settings/Integrations/Index"
    end

    # @route PATCH /settings/integrations (settings_integrations)
    def update
    end
  end
end
