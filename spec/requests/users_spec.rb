require "rails_helper"
require_relative "../support/devise"

RSpec.describe "/users", type: :request do
  login_super_admin

  describe "GET /index" do
    it "renders a successful response" do
      get users_url

      expect(response).to be_successful
      expect(inertia).to render_component("Users/Index")
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      user = create(:user)
      user.confirm

      get user_url(user)

      expect(response).to be_successful
      expect(inertia).to render_component("Users/Show")
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_user_url

      expect(response).to be_successful
      expect(inertia).to render_component("Users/New")
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      user = create(:user)
      user.confirm

      get edit_user_url(user)

      expect(response).to be_successful
      expect(inertia).to render_component("Users/Edit")
    end
  end

  describe "PATCH /update" do
    it "updates the user" do
      user = create(:user, active: true)
      user.confirm

      patch user_url(user), params: {
        user: { active: false },
      }

      expect(response).to redirect_to(user_url(user.reload))
      expect(user.active).to be(false)
    end

    it "returns validation errors for invalid params" do
      user = create(:user)
      user.confirm

      patch user_url(user), params: {
        user: { email: "" },
      }

      expect(response).to redirect_to(edit_user_path(user))
    end
  end

  describe "DELETE /destroy" do
    it "destroys the user" do
      user = create(:user)
      user.confirm

      expect {
        delete user_url(user)
      }.to change(User, :count).by(-1)

      expect(response).to redirect_to(users_url)
    end
  end
end
