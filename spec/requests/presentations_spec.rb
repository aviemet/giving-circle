require 'rails_helper'
require_relative '../support/devise'

RSpec.describe "/presentations", type: :request do

  # This should return the minimal set of attributes required to create a valid
  # Presentation. As you add validations to Presentation, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  describe "GET /index" do
    it "renders a successful response" do
      Presentation.create! valid_attributes
      get presentations_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      presentation = Presentation.create! valid_attributes
      get presentation_url(presentation)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_presentation_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      presentation = Presentation.create! valid_attributes
      get edit_presentation_url(presentation)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Presentation" do
        expect {
          post presentations_url, params: { presentation: valid_attributes }
        }.to change(Presentation, :count).by(1)
      end

      it "redirects to the created presentation" do
        post presentations_url, params: { presentation: valid_attributes }
        expect(response).to redirect_to(presentation_url(Presentation.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Presentation" do
        expect {
          post presentations_url, params: { presentation: invalid_attributes }
        }.not_to change(Presentation, :count)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post presentations_url, params: { presentation: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested presentation" do
        presentation = Presentation.create! valid_attributes
        patch presentation_url(presentation), params: { presentation: new_attributes }
        presentation.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the presentation" do
        presentation = Presentation.create! valid_attributes
        patch presentation_url(presentation), params: { presentation: new_attributes }
        presentation.reload
        expect(response).to redirect_to(presentation_url(presentation))
      end
    end

    context "with invalid parameters" do

      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        presentation = Presentation.create! valid_attributes
        patch presentation_url(presentation), params: { presentation: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested presentation" do
      presentation = Presentation.create! valid_attributes
      expect {
        delete presentation_url(presentation)
      }.to change(Presentation, :count).by(-1)
    end

    it "redirects to the presentations list" do
      presentation = Presentation.create! valid_attributes
      delete presentation_url(presentation)
      expect(response).to redirect_to(presentations_url)
    end
  end
end
