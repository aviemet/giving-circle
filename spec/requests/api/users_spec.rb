require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Api::Users", type: :request do
  login_super_admin

  describe "PATCH /api/users/:id" do
    it "updates the user" do
      user = create(:user, active: true)
      user.confirm

      patch api_user_path(user), params: {
        user: { active: false },
      }

      expect(response).to have_http_status(:created)
      expect(user.reload.active).to be(false)
      expect(response.parsed_body[:active] || response.parsed_body["active"]).to be(false)
    end

    it "returns errors for invalid params" do
      user = create(:user)
      user.confirm

      patch api_user_path(user), params: {
        user: { email: "" },
      }

      expect(response).to have_http_status(:see_other)
      expect(response.parsed_body["errors"] || response.parsed_body[:errors]).to be_present
    end
  end

  describe "PATCH /api/users/:id/update_table_preferences" do
    it "merges table preferences" do
      patch api_update_table_preferences_path(@admin), params: {
        user: {
          table_preferences: {
            users: { sorting: [{ id: "email", desc: false }] },
          },
        },
      }

      expect(response).to have_http_status(:ok)
      expect(@admin.reload.table_preferences.dig("users", "sorting")).to be_present
    end
  end

  describe "PATCH /api/users/:id/update_user_preferences" do
    it "merges user preferences" do
      patch api_update_user_preferences_path(@admin), params: {
        user: {
          user_preferences: { colorScheme: "dark" },
        },
      }

      expect(response).to have_http_status(:ok)
      expect(@admin.reload.user_preferences["colorScheme"]).to eq("dark")
    end
  end
end
