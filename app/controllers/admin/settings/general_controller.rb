module Admin
  class Settings::GeneralController < AdminController
    def index
      render inertia: "Settings/General/Index"
    end

    def update
    end

  end
end
