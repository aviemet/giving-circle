require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe "/presentation_elements", type: :request do
  
  # This should return the minimal set of attributes required to create a valid
  # PresentationElement. As you add validations to PresentationElement, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  describe "GET /index" do
    it "renders a successful response" do
      PresentationElement.create! valid_attributes
      get presentation_elements_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      presentation_element = PresentationElement.create! valid_attributes
      get presentation_element_url(presentation_element)
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
      presentation_element = PresentationElement.create! valid_attributes
      get edit_presentation_element_url(presentation_element)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new PresentationElement" do
        expect {
          post presentation_elements_url, params: { presentation_element: valid_attributes }
        }.to change(PresentationElement, :count).by(1)
      end

      it "redirects to the created presentation_element" do
        post presentation_elements_url, params: { presentation_element: valid_attributes }
        expect(response).to redirect_to(presentation_element_url(PresentationElement.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new PresentationElement" do
        expect {
          post presentation_elements_url, params: { presentation_element: invalid_attributes }
        }.to change(PresentationElement, :count).by(0)
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
        presentation_element = PresentationElement.create! valid_attributes
        patch presentation_element_url(presentation_element), params: { presentation_element: new_attributes }
        presentation_element.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the presentation_element" do
        presentation_element = PresentationElement.create! valid_attributes
        patch presentation_element_url(presentation_element), params: { presentation_element: new_attributes }
        presentation_element.reload
        expect(response).to redirect_to(presentation_element_url(presentation_element))
      end
    end

    context "with invalid parameters" do
    
      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        presentation_element = PresentationElement.create! valid_attributes
        patch presentation_element_url(presentation_element), params: { presentation_element: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested presentation_element" do
      presentation_element = PresentationElement.create! valid_attributes
      expect {
        delete presentation_element_url(presentation_element)
      }.to change(PresentationElement, :count).by(-1)
    end

    it "redirects to the presentation_elements list" do
      presentation_element = PresentationElement.create! valid_attributes
      delete presentation_element_url(presentation_element)
      expect(response).to redirect_to(presentation_elements_url)
    end
  end
end