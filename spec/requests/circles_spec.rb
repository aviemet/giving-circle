require 'rails_helper'
require_relative '../support/devise'

RSpec.describe "/circles", type: :request do
  login_admin

  describe "GET /index" do
    it "renders a successful response" do
      get circles_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      ap({ admin: @admin })
      get circle_url(@admin.circles.first)

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
      get edit_circle_url(create(:circle))

      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Circle" do
        expect {
          post circles_url, params: { circle: attributes(:circle) }
        }.to change(Circle, :count).by(1)
      end

      it "redirects to the created circle" do
        post circles_url, params: { circle: attributes(:circle) }

        expect(response).to redirect_to(circle_url(Circle.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Circle" do
        expect {
          post circles_url, params: { circle: {} }
        }.not_to change(Circle, :count)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post circles_url, params: { circle: {} }

        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      it "updates the requested circle" do
        circle = create(:circle)
        new_attributes = attributes(:circle)

        patch circle_url(circle), params: { circle: new_attributes }
        circle.reload

        expect(circle.name).to eq(new_attributes.name)
      end

      it "redirects to the circle" do
        circle = create(:circle)
        new_attributes = attributes(:circle)

        patch circle_url(circle), params: { circle: new_attributes }

        circle.reload

        expect(response).to redirect_to(circle_url(circle))
      end
    end

    context "with invalid parameters" do

      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        circle = create(:circle)

        patch circle_url(circle), params: { circle: {} }

        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested circle" do
      circle = create(:circle)

      expect {
        delete circle_url(circle)
      }.to change(Circle, :count).by(-1)
    end

    it "redirects to the circles list" do
      circle = create(:circle)

      delete circle_url(circle)

      expect(response).to redirect_to(circles_url)
    end
  end
end
