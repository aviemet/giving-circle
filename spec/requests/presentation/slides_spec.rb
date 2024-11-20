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

RSpec.describe "/presentation/slides", type: :request do
  
  # This should return the minimal set of attributes required to create a valid
  # Presentation::Slide. As you add validations to Presentation::Slide, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  describe "GET /index" do
    it "renders a successful response" do
      Presentation::Slide.create! valid_attributes
      get presentation_slides_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      slide = Presentation::Slide.create! valid_attributes
      get presentation_slide_url(slide)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_presentation_slide_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      slide = Presentation::Slide.create! valid_attributes
      get edit_presentation_slide_url(slide)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Presentation::Slide" do
        expect {
          post presentation_slides_url, params: { presentation_slide: valid_attributes }
        }.to change(Presentation::Slide, :count).by(1)
      end

      it "redirects to the created presentation_slide" do
        post presentation_slides_url, params: { presentation_slide: valid_attributes }
        expect(response).to redirect_to(presentation_slide_url(Presentation::Slide.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Presentation::Slide" do
        expect {
          post presentation_slides_url, params: { presentation_slide: invalid_attributes }
        }.to change(Presentation::Slide, :count).by(0)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post presentation_slides_url, params: { presentation_slide: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested presentation_slide" do
        slide = Presentation::Slide.create! valid_attributes
        patch presentation_slide_url(slide), params: { presentation_slide: new_attributes }
        slide.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the presentation_slide" do
        slide = Presentation::Slide.create! valid_attributes
        patch presentation_slide_url(slide), params: { presentation_slide: new_attributes }
        slide.reload
        expect(response).to redirect_to(presentation_slide_url(slide))
      end
    end

    context "with invalid parameters" do
      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        slide = Presentation::Slide.create! valid_attributes
        patch presentation_slide_url(slide), params: { presentation_slide: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested presentation_slide" do
      slide = Presentation::Slide.create! valid_attributes
      expect {
        delete presentation_slide_url(slide)
      }.to change(Presentation::Slide, :count).by(-1)
    end

    it "redirects to the presentation_slides list" do
      slide = Presentation::Slide.create! valid_attributes
      delete presentation_slide_url(slide)
      expect(response).to redirect_to(presentation_slides_url)
    end
  end
end