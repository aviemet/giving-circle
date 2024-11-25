require 'rails_helper'
require_relative '../support/devise'

RSpec.describe "/presentations", type: :request do
  def valid_attributes(theme = nil)
    if theme.nil?
      { presentation: attributes_for(:presentation)}
    else
      { presentation: attributes_for(:presentation, { theme: theme })}
    end
  end

  def invalid_attributes
    { presentation: { name: "" } }
  end

  describe "GET /index" do
    login_super_admin

    it "renders a successful response" do
      presentation = create(:presentation, circle: @admin.circles.first)

      get theme_presentations_url(presentation.circle, presentation.theme)

      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    login_super_admin

    it "renders a successful response" do
      presentation = create(:presentation, circle: @admin.circles.first)

      get theme_presentation_url(presentation.circle, presentation.theme, presentation)

      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    login_super_admin

    it "renders a successful response" do
      theme = create(:theme, circle: @admin.circles.first)

      get new_theme_presentation_url(theme.circle, theme)

      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    login_super_admin

    it "renders a successful response" do
      presentation = create(:presentation, circle: @admin.circles.first)

      get edit_theme_presentation_url(presentation.circle, presentation.theme, presentation)

      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    login_super_admin

    context "with valid parameters" do
      it "creates a new Presentation" do
        theme = create(:theme, circle: @admin.circles.first)

        expect {
          post theme_presentations_url(theme.circle, theme), params: valid_attributes
        }.to change(Presentation, :count).by(1)
      end

      it "redirects to the created presentation" do
        theme = create(:theme, circle: @admin.circles.first)

        post theme_presentations_url(theme.circle, theme), params: valid_attributes

        expect(response).to redirect_to(theme_presentation_url(theme.circle, theme, Presentation.last))
        expect(flash[:notice]).to eq(I18n.t('presentations.notices.created'))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Presentation" do
        theme = create(:theme, circle: @admin.circles.first)

        expect {
          post theme_presentations_url(theme.circle, theme), params: invalid_attributes
        }.not_to change(Presentation, :count)
      end

      it "redirects back to the new presentation page" do
        theme = create(:theme, circle: @admin.circles.first)

        post theme_presentations_url(theme.circle, theme), params: invalid_attributes

        expect(response).to redirect_to(new_theme_presentation_url(theme.circle, theme))
      end

    end
  end

  describe "PATCH /update" do
    login_super_admin

    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested presentation" do
        presentation = Presentation.create! valid_attributes
        patch theme_presentation_url(presentation.circle, presentation.theme, presentation), params: { presentation:
        new_attributes }
        presentation.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the presentation" do
        presentation = Presentation.create! valid_attributes
        patch theme_presentation_url(presentation.circle, presentation.theme, presentation), params: { presentation:
        new_attributes }
        presentation.reload
        expect(response).to redirect_to(theme_presentation_url(presentation.circle, presentation.theme, presentation))

      end
    end

    context "with invalid parameters" do

      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        presentation = Presentation.create! valid_attributes
        patch theme_presentation_url(presentation.circle, presentation.theme, presentation), params: { presentation:
        invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

  describe "DELETE /destroy" do
    login_super_admin

    it "destroys the requested presentation" do
      presentation = create(:presentation)

      expect {
        delete theme_presentation_url(presentation.circle, presentation.theme, presentation)
      }.to change(Presentation, :count).by(-1)
    end

    it "redirects to the presentations list" do
      presentation = create(:presentation)

      delete theme_presentation_url(presentation.circle, presentation.theme, presentation)

      expect(response).to redirect_to(theme_presentations_url)
    end
  end
end
