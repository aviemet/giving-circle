module Admin
  class Settings::NotificationsController < AdminController

    # @route GET /admin/settings/notifications (settings_notifications)
    def index
      render inertia: "Settings/Notifications/Index"
    end

    # @route PATCH /admin/settings/notifications (settings_notifications)
    def update
    end
  end
end
