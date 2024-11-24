require 'rails_helper'
require_relative '../../support/devise'

RSpec.describe "/presentation/elements", type: :request do

  # This should return the minimal set of attributes required to create a valid
  # Presentation::Element. As you add validations to Presentation::Element, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  describe "GET /index" do
    it "renders a successful response" do
      Presentation::Element.create! valid_attributes
      get presentation_elements_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      element = Presentation::Element.create! valid_attributes
      get presentation_element_url(element)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_presentation_element_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      element = Presentation::Element.create! valid_attributes
      get edit_presentation_element_url(element)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Presentation::Element" do
        expect {
          post presentation_elements_url, params: { presentation_element: valid_attributes }
        }.to change(Presentation::Element, :count).by(1)
      end

      it "redirects to the created presentation_element" do
        post presentation_elements_url, params: { presentation_element: valid_attributes }
        expect(response).to redirect_to(presentation_element_url(Presentation::Element.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Presentation::Element" do
        expect {
          post presentation_elements_url, params: { presentation_element: invalid_attributes }
        }.not_to change(Presentation::Element, :count)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post presentation_elements_url, params: { presentation_element: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested presentation_element" do
        element = Presentation::Element.create! valid_attributes
        patch presentation_element_url(element), params: { presentation_element: new_attributes }
        element.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the presentation_element" do
        element = Presentation::Element.create! valid_attributes
        patch presentation_element_url(element), params: { presentation_element: new_attributes }
        element.reload
        expect(response).to redirect_to(presentation_element_url(element))
      end
    end

    context "with invalid parameters" do
      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        element = Presentation::Element.create! valid_attributes
        patch presentation_element_url(element), params: { presentation_element: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested presentation_element" do
      element = Presentation::Element.create! valid_attributes
      expect {
        delete presentation_element_url(element)
      }.to change(Presentation::Element, :count).by(-1)
    end

    it "redirects to the presentation_elements list" do
      element = Presentation::Element.create! valid_attributes
      delete presentation_element_url(element)
      expect(response).to redirect_to(presentation_elements_url)
    end
  end
end
