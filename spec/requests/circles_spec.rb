require 'rails_helper'

RSpec.describe "/circles", type: :request do
  describe "GET /index" do
    it "renders a successful response" do

      get circles_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      get circle_url(circle)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_circle_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      circle = Circle.create! valid_attributes
      get edit_circle_url(circle)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Circle" do
        expect {
          post circles_url, params: { circle: valid_attributes }
        }.to change(Circle, :count).by(1)
      end

      it "redirects to the created circle" do
        post circles_url, params: { circle: valid_attributes }
        expect(response).to redirect_to(circle_url(Circle.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Circle" do
        expect {
          post circles_url, params: { circle: invalid_attributes }
        }.not_to change(Circle, :count)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post circles_url, params: { circle: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested circle" do
        circle = Circle.create! valid_attributes
        patch circle_url(circle), params: { circle: new_attributes }
        circle.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the circle" do
        circle = Circle.create! valid_attributes
        patch circle_url(circle), params: { circle: new_attributes }
        circle.reload
        expect(response).to redirect_to(circle_url(circle))
      end
    end

    context "with invalid parameters" do

      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        circle = Circle.create! valid_attributes
        patch circle_url(circle), params: { circle: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested circle" do
      circle = Circle.create! valid_attributes
      expect {
        delete circle_url(circle)
      }.to change(Circle, :count).by(-1)
    end

    it "redirects to the circles list" do
      circle = Circle.create! valid_attributes
      delete circle_url(circle)
      expect(response).to redirect_to(circles_url)
    end
  end
end
