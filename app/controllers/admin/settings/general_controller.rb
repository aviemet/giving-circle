module Admin
  class Settings::GeneralController < AdminController
    # @route GET /admin/settings/general (admin_settings_general_index)
    def index
      render inertia: "Settings/General/Index"
    end

    # @route PATCH /admin/settings/general/:id (admin_settings_general)
    # @route PUT /admin/settings/general/:id (admin_settings_general)
    def update
    end

  end
end
