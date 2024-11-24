require 'rails_helper'
require_relative '../support/devise'

RSpec.describe "/members", type: :request do
  def valid_attributes(circle = nil)
    { membership: attributes_for(:membership, { circle: circle || create(:circle)}) }
  end

  def invalid_attributes
    { membership: { name: "" } }
  end

  describe "GET /index" do
    login_super_admin

    it "renders a successful response" do
      membership = create(:membership)

      get circle_memberships_url(membership.circle)

      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    login_super_admin

    it "renders a successful response" do
      membership = create(:membership)

      get membership_url(membership.circle, membership)

      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    login_super_admin

    it "renders a successful response" do
      get new_circle_membership_url(@admin.circles.first)

      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    login_super_admin

    it "renders a successful response" do
      membership = create(:membership)

      get edit_membership_url(membership.circle, membership)

      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    login_super_admin

    context "with valid parameters" do
      it "creates a new Membership" do
        circle = @admin.circles.first
        attributes = valid_attributes(circle)
        attributes[:membership][:person_id] = create(:person).id

        expect {
          post circle_memberships_url(circle), params: attributes
        }.to change(Membership, :count).by(1)
      end

      it "redirects to the created membership" do
        circle = @admin.circles.first
        attributes = valid_attributes(circle)
        attributes[:membership][:person_id] = create(:person).id

        post circle_memberships_url(circle), params: attributes

        expect(response).to redirect_to(membership_url(Membership.last.circle, Membership.last))
        expect(flash[:notice]).to eq(I18n.t('memberships.notices.created'))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Membership" do
        circle = create(:circle)

        expect {
          post circle_memberships_url(circle), params: invalid_attributes
        }.not_to change(Membership, :count)
      end

      it "redirects back to the new membership page" do
        circle = create(:circle)
        post circle_memberships_url(circle), params: invalid_attributes

        expect(response).to redirect_to(new_circle_membership_url(circle))
      end
    end
  end

  describe "PATCH /update" do
    login_super_admin

    context "with valid parameters" do
      it "updates the requested membership" do
        membership = create(:membership, { circle: @admin.circles.first })
        new_attributes = valid_attributes(membership.circle)

        patch membership_url(membership.circle, membership), params: new_attributes
        membership.reload

        expect(membership.name).to eq(new_attributes[:membership][:name])
      end

      it "redirects to the membership" do
        membership = create(:membership, { circle: @admin.circles.first })
        new_attributes = valid_attributes(membership.circle)

        patch membership_url(membership.circle, membership), params: new_attributes
        membership.reload

        expect(response).to redirect_to(membership_url(membership.circle, membership))
        expect(flash[:notice]).to eq(I18n.t('memberships.notices.updated'))
      end
    end

    context "with invalid parameters" do
      it "redirects back to the edit membership page" do
        membership = create(:membership)

        patch membership_url(membership.circle, membership), params: invalid_attributes

        expect(response).to redirect_to(edit_membership_url(membership.circle, membership))
      end
    end
  end

  describe "DELETE /destroy" do
    login_super_admin

    it "destroys the requested membership" do
      membership = create(:membership)

      expect {
        delete membership_url(membership.circle, membership)
      }.to change(Membership, :count).by(-1)
    end

    it "redirects to the members list" do
      membership = create(:membership, circle: @admin.circles.first)

      delete membership_url(membership.circle, membership)

      expect(response).to redirect_to(circle_memberships_url(@admin.circles.first))
      expect(flash[:notice]).to eq(I18n.t('memberships.notices.destroyed'))
    end
  end
end
