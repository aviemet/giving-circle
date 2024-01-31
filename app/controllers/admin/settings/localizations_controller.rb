module Admin
  class Settings::LocalizationsController < AdminController
    # @route GET /admin/settings/localizations (settings_localizations)
    def index
      render inertia: "Settings/Localization/Index"
    end

    # @route PATCH /admin/settings/localizations (settings_localizations)
    def update
    end

  end
end
