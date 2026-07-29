require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Api::Searches", type: :request do
  login_super_admin

  describe "GET /api/searches" do
    it "returns search results" do
      get api_searches_path, params: { search: "circle" }

      expect(response).to be_successful
      expect(response.parsed_body).to be_an(Array)
    end
  end
end
