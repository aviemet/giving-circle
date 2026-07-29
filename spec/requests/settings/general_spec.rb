require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Settings::General", type: :request do
  login_super_admin

  describe "GET /settings/general" do
    it "renders the general settings page" do
      get settings_general_path

      expect(response).to be_successful
      expect(inertia).to render_component("Settings/General/Index")
    end
  end

  describe "PATCH /settings/general" do
    it "hits the stub update action" do
      patch settings_general_path

      expect(response.status).to be_between(200, 204)
    end
  end
end
