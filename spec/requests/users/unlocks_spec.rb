require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Users::Unlocks", type: :request do
  describe "GET /users/unlock/new" do
    it "renders the unlock page via devise" do
      get new_user_unlock_path

      expect(response).to be_successful
    end
  end
end
