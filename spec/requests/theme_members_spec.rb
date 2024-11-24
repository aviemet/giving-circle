require 'rails_helper'
require_relative '../support/devise'

RSpec.describe "ThemeMembers", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/theme_members/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/theme_members/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /new" do
    it "returns http success" do
      get "/theme_members/new"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/theme_members/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/theme_members/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
