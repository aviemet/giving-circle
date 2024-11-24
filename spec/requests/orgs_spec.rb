require 'rails_helper'
require_relative '../support/devise'

RSpec.describe "/orgs", type: :request do

  # This should return the minimal set of attributes required to create a valid
  # Org. As you add validations to Org, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  describe "GET /index" do
    it "renders a successful response" do
      Org.create! valid_attributes
      get orgs_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      org = Org.create! valid_attributes
      get org_url(org)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_org_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      org = Org.create! valid_attributes
      get edit_org_url(org)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Org" do
        expect {
          post orgs_url, params: { org: valid_attributes }
        }.to change(Org, :count).by(1)
      end

      it "redirects to the created org" do
        post orgs_url, params: { org: valid_attributes }
        expect(response).to redirect_to(org_url(Org.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Org" do
        expect {
          post orgs_url, params: { org: invalid_attributes }
        }.not_to change(Org, :count)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post orgs_url, params: { org: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested org" do
        org = Org.create! valid_attributes
        patch org_url(org), params: { org: new_attributes }
        org.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the org" do
        org = Org.create! valid_attributes
        patch org_url(org), params: { org: new_attributes }
        org.reload
        expect(response).to redirect_to(org_url(org))
      end
    end

    context "with invalid parameters" do

      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        org = Org.create! valid_attributes
        patch org_url(org), params: { org: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested org" do
      org = Org.create! valid_attributes
      expect {
        delete org_url(org)
      }.to change(Org, :count).by(-1)
    end

    it "redirects to the orgs list" do
      org = Org.create! valid_attributes
      delete org_url(org)
      expect(response).to redirect_to(orgs_url)
    end
  end
end
