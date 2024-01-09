module Admin
  class Settings::LocalizationsController < AdminController
    # @route GET /admin/settings/localizations (admin_settings_localizations)
    def index
      render inertia: "Settings/Localization/Index"
    end

    # @route PATCH /admin/settings/localizations/:id (admin_settings_localization)
    # @route PUT /admin/settings/localizations/:id (admin_settings_localization)
    def update
    end

  end
end
