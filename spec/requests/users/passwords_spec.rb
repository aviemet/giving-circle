require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Users::Passwords", type: :request do
  describe "GET /users/password/new" do
    it "renders the forgot password page" do
      get new_user_password_path

      expect(response).to be_successful
      expect(inertia).to render_component("Auth/Passwords/New")
    end
  end

  describe "POST /users/password" do
    it "sends reset password instructions for a known email" do
      user = create(:user)
      user.confirm

      post user_password_path, params: {
        user: { email: user.email },
      }

      expect(response).to redirect_to(new_user_session_path)
    end
  end
end
