require 'rails_helper'
require_relative '../support/devise'

RSpec.describe "/themes", type: :request do

  # This should return the minimal set of attributes required to create a valid
  # Theme. As you add validations to Theme, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  describe "GET /index" do
    it "renders a successful response" do
      Theme.create! valid_attributes
      get themes_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      theme = Theme.create! valid_attributes
      get theme_url(theme)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_theme_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      theme = Theme.create! valid_attributes
      get edit_theme_url(theme)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Theme" do
        expect {
          post themes_url, params: { theme: valid_attributes }
        }.to change(Theme, :count).by(1)
      end

      it "redirects to the created theme" do
        post themes_url, params: { theme: valid_attributes }
        expect(response).to redirect_to(theme_url(Theme.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Theme" do
        expect {
          post themes_url, params: { theme: invalid_attributes }
        }.not_to change(Theme, :count)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post themes_url, params: { theme: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested theme" do
        theme = Theme.create! valid_attributes
        patch theme_url(theme), params: { theme: new_attributes }
        theme.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the theme" do
        theme = Theme.create! valid_attributes
        patch theme_url(theme), params: { theme: new_attributes }
        theme.reload
        expect(response).to redirect_to(theme_url(theme))
      end
    end

    context "with invalid parameters" do

      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        theme = Theme.create! valid_attributes
        patch theme_url(theme), params: { theme: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested theme" do
      theme = Theme.create! valid_attributes
      expect {
        delete theme_url(theme)
      }.to change(Theme, :count).by(-1)
    end

    it "redirects to the themes list" do
      theme = Theme.create! valid_attributes
      delete theme_url(theme)
      expect(response).to redirect_to(themes_url)
    end
  end
end
