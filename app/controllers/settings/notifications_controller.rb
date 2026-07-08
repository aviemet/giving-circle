module Admin
  class Settings::NotificationsController < Settings::CircleSettingsController
    # @route GET /settings/:circle_slug/notifications (settings_notifications)
    def index
      render inertia: "Settings/Notifications/Index"
    end

    # @route PATCH /settings/:circle_slug/notifications (settings_notifications)
    def update
    end
  end
end
