require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Api::Currencies", type: :request do
  login_super_admin

  describe "GET /api/currencies" do
    it "returns currency symbols and codes" do
      get api_currencies_path

      expect(response).to be_successful
      expect(response.parsed_body).to be_an(Array)
      expect(response.parsed_body.first).to include("symbol", "code")
    end
  end
end
