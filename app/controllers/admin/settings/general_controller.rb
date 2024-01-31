module Admin
  class Settings::GeneralController < AdminController
    # @route GET /admin/settings/general (settings_general)
    def index
      render inertia: "Settings/General/Index"
    end

    # @route PATCH /admin/settings/general (settings_general)
    def update
    end

  end
end
