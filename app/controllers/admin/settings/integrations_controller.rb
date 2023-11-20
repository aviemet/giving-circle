module Admin
  class Settings::IntegrationsController < AdminController

    def index
      render inertia: "Settings/Integrations/Index"
    end

    def update
    end
  end
end
