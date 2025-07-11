require 'rails_helper'
require_relative '../../support/devise'

RSpec.describe "/presentation/distributions", type: :request do

  # This should return the minimal set of attributes required to create a valid
  # Presentation::Distribution. As you add validations to Presentation::Distribution, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  describe "GET /index" do
    it "renders a successful response" do
      Presentation::Distribution.create! valid_attributes
      get presentation_distributions_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      distribution = Presentation::Distribution.create! valid_attributes
      get presentation_distribution_url(distribution)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_presentation_distribution_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      distribution = Presentation::Distribution.create! valid_attributes
      get edit_presentation_distribution_url(distribution)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Presentation::Distribution" do
        expect {
          post presentation_distributions_url, params: { presentation_distribution: valid_attributes }
        }.to change(Presentation::Distribution, :count).by(1)
      end

      it "redirects to the created presentation_distribution" do
        post presentation_distributions_url, params: { presentation_distribution: valid_attributes }
        expect(response).to redirect_to(presentation_distribution_url(Presentation::Distribution.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Presentation::Distribution" do
        expect {
          post presentation_distributions_url, params: { presentation_distribution: invalid_attributes }
        }.not_to change(Presentation::Distribution, :count)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post presentation_distributions_url, params: { presentation_distribution: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested presentation_distribution" do
        distribution = Presentation::Distribution.create! valid_attributes
        patch presentation_distribution_url(distribution), params: { presentation_distribution: new_attributes }
        distribution.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the presentation_distribution" do
        distribution = Presentation::Distribution.create! valid_attributes
        patch presentation_distribution_url(distribution), params: { presentation_distribution: new_attributes }
        distribution.reload
        expect(response).to redirect_to(presentation_distribution_url(distribution))
      end
    end

    context "with invalid parameters" do

      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        distribution = Presentation::Distribution.create! valid_attributes
        patch presentation_distribution_url(distribution), params: { presentation_distribution: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested presentation_distribution" do
      distribution = Presentation::Distribution.create! valid_attributes
      expect {
        delete presentation_distribution_url(distribution)
      }.to change(Presentation::Distribution, :count).by(-1)
    end

    it "redirects to the presentation_distributions list" do
      distribution = Presentation::Distribution.create! valid_attributes
      delete presentation_distribution_url(distribution)
      expect(response).to redirect_to(presentation_distributions_url)
    end
  end
end
