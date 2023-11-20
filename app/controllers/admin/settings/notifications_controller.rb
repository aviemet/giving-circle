module Admin
  class Settings::NotificationsController < AdminController

    def index
      render inertia: "Settings/Notifications/Index"
    end

    def update
    end
  end
end
