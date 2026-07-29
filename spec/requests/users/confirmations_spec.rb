require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Users::Confirmations", type: :request do
  describe "GET /users/confirmation/new" do
    it "renders the confirmation page with email" do
      get new_user_confirmation_path, params: { email: "pending@example.com" }

      expect(response).to be_successful
      expect(inertia).to render_component("Auth/Confirmations/New")
      expect(inertia.props[:user]["email"]).to eq("pending@example.com")
    end
  end

  describe "GET /users/confirmation" do
    it "redirects to login when the token is missing" do
      get user_confirmation_path

      expect(response).to redirect_to(new_user_session_path)
    end

    it "confirms a user with a valid token" do
      user = create(:user)
      raw_token = Devise.friendly_token
      user.update_columns(
        confirmation_token: Devise.token_generator.digest(User, :confirmation_token, raw_token),
        confirmation_sent_at: Time.current,
        confirmed_at: nil,
      )

      get user_confirmation_path, params: { confirmation_token: raw_token }

      expect(response).to redirect_to("/")
      expect(user.reload).to be_confirmed
    end

    it "redirects with errors for an invalid token" do
      get user_confirmation_path, params: { confirmation_token: "not-a-real-token" }

      expect(response).to redirect_to(user_confirmation_path)
    end
  end

  describe "POST /users/confirmation" do
    it "resends confirmation instructions" do
      user = create(:user)

      post user_confirmation_path, params: {
        user: { email: user.email },
      }

      expect(response).to redirect_to(new_user_session_path)
    end

    it "returns errors for an unknown email" do
      post user_confirmation_path, params: {
        user: { email: "missing@example.com" },
      }

      expect(response).to redirect_to(new_user_confirmation_path)
    end
  end
end
