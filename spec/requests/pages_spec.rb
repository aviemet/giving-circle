require 'rails_helper'
require_relative '../support/devise'

RSpec.describe "Pages", type: :request do
  describe "GET /" do

    context "when logged in as an admin" do
      login_super_admin

      it "renders a successful response" do
        get root_url

        expect(response).to be_successful
      end
    end

    context "when logged in as a normal user" do
      login_user(:admin)

      it "renders a successful response" do
        get root_url

        expect(response).to be_successful
      end
    end

    context "without being logged in" do
      it "renders a successful response" do
        get root_url

        expect(response).to be_successful
      end
    end

  end
end
