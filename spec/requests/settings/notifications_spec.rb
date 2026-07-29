require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Settings::Notifications", type: :request do
  login_super_admin

  describe "GET /settings/:circle_slug/notifications" do
    it "renders the notifications settings page" do
      circle = @admin.circles.first

      get settings_notifications_path(circle_slug: circle.slug)

      expect(response).to be_successful
      expect(inertia).to render_component("Settings/Notifications/Index")
    end
  end

  describe "PATCH /settings/:circle_slug/notifications" do
    it "hits the stub update action" do
      circle = @admin.circles.first

      patch settings_notifications_path(circle_slug: circle.slug)

      expect(response.status).to be_between(200, 204).or eq(302)
    end
  end
end
