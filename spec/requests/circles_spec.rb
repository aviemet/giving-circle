require 'rails_helper'
require_relative '../support/devise'

RSpec.describe "/circles", type: :request do
  login_admin

  def valid_attributes
    { circle: attributes_for(:circle) }
  end

  def invalid_attributes
    { circle: { name: "" } }
  end

  describe "GET /index" do
    it "renders a successful response" do
      get circles_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
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
          post circles_url, params: valid_attributes
        }.to change(Circle, :count).by(1)
      end

      it "redirects to the created circle" do
        post circles_url, params: valid_attributes

        expect(response).to redirect_to(circle_url(Circle.last))
        expect(flash[:notice]).to eq(I18n.t('circles.notices.created'))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Circle" do
        expect {
          post circles_url, params: invalid_attributes
        }.not_to change(Circle, :count)
      end

      it "redirects back to the new circle page" do
        post circles_url, params: invalid_attributes

        expect(response).to redirect_to(new_circle_url)
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      it "updates the requested circle" do
        circle = create(:circle)
        new_attributes = valid_attributes

        patch circle_url(circle), params: new_attributes
        circle.reload

        expect(circle.name).to eq(new_attributes[:circle][:name])
      end

      it "redirects to the circle" do
        circle = create(:circle)

        patch circle_url(circle), params: valid_attributes
        circle.reload

        expect(response).to redirect_to(circle_url(circle))
        expect(flash[:notice]).to eq(I18n.t('circles.notices.updated'))
      end
    end

    context "with invalid parameters" do
      it "redirects back to the edit circle page" do
        patch circle_url(@admin.circles.first), params: invalid_attributes
        expect(response).to redirect_to(edit_circle_url(@admin.circles.first))
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
      expect(flash[:notice]).to eq(I18n.t('circles.notices.destroyed'))
    end
  end
end
