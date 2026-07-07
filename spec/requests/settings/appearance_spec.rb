require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "/settings/appearance", type: :request do
  describe "GET /settings/appearance" do
    login_super_admin

    it "renders a successful response" do
      get settings_appearance_url

      expect(response).to be_successful
    end
  end

  describe "PATCH /settings/appearance" do
    login_super_admin

    it "saves the primary color to user preferences" do
      patch settings_appearance_url, params: { settings: { primary_color: "grape" } }

      expect(response).to redirect_to(settings_appearance_url)
      expect(@admin.user_preferences["primaryColor"]).to eq("grape")
    end

    it "rejects unsupported colors" do
      patch settings_appearance_url, params: { settings: { primary_color: "not-a-color" } }

      expect(response).to redirect_to(settings_appearance_url)
      expect(@admin.user_preferences["primaryColor"]).to be_nil
    end
  end
end
