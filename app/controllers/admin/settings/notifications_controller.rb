module Admin
  class Settings::NotificationsController < AdminController

    # @route GET /admin/settings/notifications (admin_settings_notifications)
    def index
      render inertia: "Settings/Notifications/Index"
    end

    # @route PATCH /admin/settings/notifications/:id (admin_settings_notification)
    # @route PUT /admin/settings/notifications/:id (admin_settings_notification)
    def update
    end
  end
end
