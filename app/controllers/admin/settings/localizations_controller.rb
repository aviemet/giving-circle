module Admin
  class Settings::LocalizationsController < AdminController
    def index
      render inertia: "Settings/Localization/Index"
    end

    def update
    end

  end
end
