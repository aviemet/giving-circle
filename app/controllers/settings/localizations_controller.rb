module Admin
  class Settings::LocalizationsController < ApplicationController
    # @route GET /settings/localizations {export: true} (settings_localizations)
    def index
      render inertia: "Settings/Localization/Index"
    end

    # @route PATCH /settings/localizations {export: true} (settings_localizations)
    def update
    end

  end
end
