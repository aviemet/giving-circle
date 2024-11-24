require 'rails_helper'
require_relative '../support/devise'

RSpec.describe "/orgs", type: :request do
  def valid_attributes(circle = nil)
    { org: attributes_for(:org, { circle: circle || create(:circle)}) }
  end

  def invalid_attributes
    { org: { name: "" } }
  end

  describe "GET /index" do
    login_super_admin

    it "renders a successful response" do
      org = create(:org)

      get circle_orgs_url(org.circle)

      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    login_super_admin

    it "renders a successful response" do
      org = create(:org)

      get org_url(org.circle, org)

      expect(response).to be_successful
    end
  end

  describe "GET /about" do
    context "when logged in as an admin" do
      login_super_admin

      it "renders a successful response" do
        org = create(:org)

        get org_about_url(org.circle, org)

        expect(response).to be_successful
      end
    end

    context "when logged in as a normal user" do
      login_user(:admin)

      it "renders a successful response" do
        org = create(:org)

        get org_about_url(org.circle, org)

        expect(response).to be_successful
      end
    end

    context "without being logged in" do
      it "renders a successful response" do
        org = create(:org)

        get org_about_url(org.circle, org)

        expect(response).to be_successful
      end
    end
  end

  describe "GET /new" do
    login_super_admin

    it "renders a successful response" do
      get new_circle_org_url(@admin.circles.first)

      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    login_super_admin

    it "renders a successful response" do
      org = create(:org, circle: @admin.circles.first)

      get edit_org_url(org.circle, org)

      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    login_super_admin

    context "with valid parameters" do
      it "creates a new Org" do
        circle = @admin.circles.first
        attributes = valid_attributes(circle)

        expect {
          post circle_orgs_url(circle), params: attributes
        }.to change(Org, :count).by(1)
      end

      it "redirects to the created org" do
        circle = @admin.circles.first
        attributes = valid_attributes(circle)

        post circle_orgs_url(circle), params: attributes
        expect(response).to redirect_to(org_url(circle, Org.last))
        expect(flash[:notice]).to eq(I18n.t('orgs.notices.created'))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Org" do
        circle = @admin.circles.first

        expect {
          post circle_orgs_url(circle), params: invalid_attributes
        }.not_to change(Org, :count)
      end

      it "redirects back to the new org page" do
        circle = @admin.circles.first

        post circle_orgs_url(circle), params: invalid_attributes

        expect(response).to redirect_to(new_circle_org_url(circle))
      end
    end
  end

  describe "PATCH /update" do
    login_super_admin

    context "with valid parameters" do
      it "updates the requested org" do
        org = create(:org, { circle: @admin.circles.first })
        new_attributes = valid_attributes(org.circle)

        patch org_url(org.circle, org), params: new_attributes
        org.reload

        expect(org.name).to eq(new_attributes[:org][:name])
      end

      it "redirects to the org" do
        org = create(:org, { circle: @admin.circles.first })
        new_attributes = valid_attributes(org.circle)

        patch org_url(org.circle, org), params: new_attributes
        org.reload

        expect(response).to redirect_to(org_url(org.circle, org))
        expect(flash[:notice]).to eq(I18n.t('orgs.notices.updated'))
      end
    end

    context "with invalid parameters" do
      it "redirects back to the edit org page" do
        org = create(:org, { circle: @admin.circles.first })

        patch org_url(org.circle, org), params: invalid_attributes

        expect(response).to redirect_to(edit_org_url(org.circle, org))
      end
    end
  end

  describe "DELETE /destroy" do
    login_super_admin

    it "destroys the requested org" do
      org = create(:org, circle: @admin.circles.first)

      expect {
        delete org_url(org.circle, org)
      }.to change(Org, :count).by(-1)
    end

    it "redirects to the orgs list" do
      org = create(:org, circle: @admin.circles.first)

      delete org_url(org.circle, org)

      expect(response).to redirect_to(circle_orgs_url(@admin.circles.first))
      expect(flash[:notice]).to eq(I18n.t('orgs.notices.destroyed'))
    end
  end
end
