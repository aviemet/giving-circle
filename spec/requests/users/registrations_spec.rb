require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Users::Registrations", type: :request do
  describe "GET /users/register" do
    it "renders the registration page" do
      get new_user_registration_path

      expect(response).to be_successful
      expect(inertia).to render_component("Auth/Register")
    end
  end

  describe "POST /users" do
    it "registers a user and redirects to confirmation" do
      expect {
        post user_registration_path, params: {
          user: {
            email: "new.member@example.com",
            password: "Password1!",
            password_confirmation: "Password1!",
          },
        }
      }.to change(User, :count).by(1)

      user = User.find_by!(email: "new.member@example.com")
      expect(response).to redirect_to(new_user_confirmation_path(email: user.email))
    end

    it "returns validation errors for invalid registration" do
      expect {
        post user_registration_path, params: {
          user: {
            email: "",
            password: "short",
            password_confirmation: "mismatch",
          },
        }
      }.not_to change(User, :count)

      expect(response).to redirect_to(new_user_registration_path)
    end

    it "signs up immediately when the user is active for authentication" do
      allow_any_instance_of(User).to receive(:active_for_authentication?).and_return(true)

      expect {
        post user_registration_path, params: {
          user: {
            email: "active.member@example.com",
            password: "Password1!",
            password_confirmation: "Password1!",
          },
        }
      }.to change(User, :count).by(1)

      expect(response).to be_redirect
    end
  end
end
