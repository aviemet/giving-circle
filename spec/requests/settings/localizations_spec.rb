require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Settings::Localizations", type: :request do
  login_super_admin

  describe "GET /settings/localizations" do
    it "renders the localizations settings page" do
      get settings_localizations_path

      expect(response).to be_successful
      expect(inertia).to render_component("Settings/Localization/Index")
    end
  end

  describe "PATCH /settings/localizations" do
    it "hits the stub update action" do
      patch settings_localizations_path

      expect(response.status).to be_between(200, 204)
    end
  end
end
