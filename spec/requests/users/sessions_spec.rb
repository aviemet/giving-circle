require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Users::Sessions", type: :request do
  describe "GET /login" do
    it "renders the login page" do
      get new_user_session_path

      expect(response).to be_successful
      expect(inertia).to render_component("Auth/Login")
    end
  end

  describe "POST /login" do
    it "signs in a confirmed user" do
      user = create(:user, password: "Password1!")
      user.confirm

      post user_session_path, params: {
        user: { email: user.email, password: "Password1!" },
      }

      expect(response).to redirect_to(circles_path)
      follow_redirect!
      expect(response).to be_successful
    end
  end

  describe "GET /logout" do
    login_super_admin

    it "signs out the user" do
      get destroy_user_session_path

      expect(response).to redirect_to(new_user_session_path)
    end
  end
end
