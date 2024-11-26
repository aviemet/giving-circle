require 'rails_helper'
require_relative '../support/devise'

RSpec.describe "/themes", type: :request do
  def invalid_attributes
    { theme: { name: "" } }
  end

  describe "GET /index" do
    login_super_admin

    it "renders a successful response" do
      10.times do
        create(:theme, circle: @admin.circles.first)
      end
      get circle_themes_url(@admin.circles.first)

      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    login_super_admin

    it "renders a successful response" do
      theme = create(:theme)

      get theme_url(theme.circle, theme)

      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    login_super_admin

    it "renders a successful response" do
      get new_circle_theme_url(@admin.circles.first)

      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    login_super_admin

    it "renders a successful response" do
      theme = create(:theme, circle: @admin.circles.first)

      get edit_theme_url(theme.circle, theme)

      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    login_super_admin

    context "with valid parameters" do
      it "creates a new Theme" do
        expect {
          post circle_themes_url(@admin.circles.first), params: { theme: attributes_for(:theme) }
        }.to change(Theme, :count).by(1)
      end

      it "redirects to the created theme" do
        post circle_themes_url(@admin.circles.first), params: { theme: attributes_for(:theme) }

        expect(response).to redirect_to(theme_url(@admin.circles.first, Theme.last))
        expect(flash[:notice]).to eq(I18n.t('themes.notices.created'))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Theme" do
        expect {
          post circle_themes_url(@admin.circles.first), params: invalid_attributes
        }.not_to change(Theme, :count)
      end

      it "redirects back to the new theme page" do
        post circle_themes_url(@admin.circles.first), params: invalid_attributes

        expect(response).to redirect_to(new_circle_theme_url(@admin.circles.first))
      end

    end
  end

  describe "PATCH /update" do
    login_super_admin

    context "with valid parameters" do
      it "updates the requested theme" do
        theme = create(:theme)
        new_attributes = attributes_for(:theme)

        patch theme_url(theme.circle, theme), params: { theme: new_attributes }
        theme.reload

        expect(theme.name).to eq(new_attributes[:name])
      end

      it "redirects to the theme" do
        theme = create(:theme)
        new_attributes = attributes_for(:theme)

        patch theme_url(theme.circle, theme), params: { theme: new_attributes }
        theme.reload

        expect(response).to redirect_to(theme_url(theme.circle, theme))
      end
    end

    context "with invalid parameters" do
      it "redirects back to the edit theme page" do
        theme = create(:theme)

        patch theme_url(theme.circle, theme), params: invalid_attributes

        expect(response).to redirect_to(edit_theme_url(theme.circle, theme))
      end
    end
  end

  describe "DELETE /destroy" do
    login_super_admin

    it "destroys the requested theme" do
      theme = create(:theme)

      expect {
        delete theme_url(theme.circle, theme)
      }.to change(Theme, :count).by(-1)
    end

    it "redirects to the themes list" do
      theme = create(:theme)
      circle_slug = theme.circle.slug

      delete theme_url(circle_slug, theme)
      expect(response).to redirect_to(circle_themes_url(circle_slug))
    end
  end
end
