require "rails_helper"
require_relative "../support/devise"

RSpec.describe "Pages", type: :request do
  describe "GET /" do

    context "when logged in as an admin" do
      login_super_admin

      it "redirects to circles and then succeeds" do
        get home_url
        expect(response).to redirect_to("/circles")
        follow_redirect!
        expect(response).to be_successful
      end
    end

    context "when logged in as a normal user" do
      login_user(:admin)

      it "redirects to circles and then succeeds" do
        get home_url
        expect(response).to redirect_to("/circles")
        follow_redirect!
        expect(response).to be_successful
      end
    end

    context "without being logged in" do
      it "redirects home to circles then login for circles index" do
        get home_url
        expect(response).to redirect_to("/circles")
        follow_redirect!
        expect(response).to redirect_to(new_user_session_path)
      end
    end

  end
end
