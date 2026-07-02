require "rails_helper"
require_relative "../support/devise"

RSpec.describe "/presentations", type: :request do
  def invalid_attributes
    { presentation: { name: "" } }
  end

  describe "GET /index" do
    login_super_admin

    it "renders a successful response" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))

      get theme_presentations_url(presentation.circle, presentation.theme)

      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    login_super_admin

    it "renders a successful response" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))

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

  describe "GET /settings" do
    login_super_admin

    it "renders a successful response" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))

      get theme_presentation_settings_url(presentation.circle, presentation.theme, presentation)

      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    login_super_admin

    context "with valid parameters" do
      it "creates a new Presentation" do
        theme = create(:theme, circle: @admin.circles.first)
        template = create(:template, circle: theme.circle)
        presentation_attrs = attributes_for(:presentation).merge(template_id: template.id)

        expect {
          post theme_presentations_url(theme.circle, theme), params: { presentation: presentation_attrs }
        }.to change(Presentation, :count).by(1)
      end

      it "redirects to the presentation editor" do
        theme = create(:theme, circle: @admin.circles.first)
        template = create(:template, circle: theme.circle)
        presentation_attrs = attributes_for(:presentation).merge(template_id: template.id)

        post theme_presentations_url(theme.circle, theme), params: { presentation: presentation_attrs }

        expect(response).to redirect_to(theme_presentation_slides_url(theme.circle, theme, Presentation.last))
        expect(flash[:notice]).to eq(I18n.t("presentations.notices.created"))
      end

      it "copies template slides when template_id is present" do
        theme = create(:theme, circle: @admin.circles.first)
        template = create(:template, circle: theme.circle)
        slide = create(:slide, title: "Template Slide")
        template.slides << slide
        presentation_attrs = attributes_for(:presentation).merge(template_id: template.id)

        post theme_presentations_url(theme.circle, theme), params: { presentation: presentation_attrs }

        presentation = Presentation.last
        expect(presentation.slides.count).to eq(1)
        expect(presentation.slides.first.title).to eq("Template Slide")
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
      it "updates the requested presentation" do
        presentation = create(:presentation)
        new_attributes = attributes_for(:presentation)

        patch theme_presentation_url(presentation.circle, presentation.theme, presentation), params: { presentation: new_attributes }
        presentation.reload

        expect(presentation.name).to eq(new_attributes[:name])
      end

      it "redirects to the presentation" do
        presentation = create(:presentation)

        patch theme_presentation_url(presentation.circle, presentation.theme, presentation), params: { presentation: attributes_for(:presentation) }
        presentation.reload

        expect(response).to redirect_to(theme_presentation_url(presentation.circle, presentation.theme, presentation))
        expect(flash[:notice]).to eq(I18n.t("presentations.notices.updated"))

      end
    end

    context "with invalid parameters" do
      it "redirects back to the settings page" do
        presentation = create(:presentation)

        patch theme_presentation_url(presentation.circle, presentation.theme, presentation), params: invalid_attributes

        expect(response).to redirect_to(theme_presentation_settings_url(presentation.circle, presentation.theme, presentation))
      end

    end
  end

  describe "POST /save_as_template" do
    login_super_admin

    it "creates a new template from the presentation" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))
      slide = create(:slide, title: "Event Slide")
      presentation.slides << slide

      expect {
        post theme_presentation_save_as_template_url(
          presentation.circle,
          presentation.theme,
          presentation,
        ), params: { name: "Saved Template", mode: "new" }
      }.to change(Template, :count).by(1)

      expect(response).to redirect_to(circle_template_url(presentation.circle, Template.last))
      expect(Template.last.slides.count).to eq(1)
    end

    it "updates the source template when mode is update_source" do
      presentation = create(:presentation, theme: create(:theme, circle: @admin.circles.first))
      slide = create(:slide, title: "Updated Slide")
      presentation.slides << slide

      post theme_presentation_save_as_template_url(
        presentation.circle,
        presentation.theme,
        presentation,
      ), params: { mode: "update_source" }

      expect(response).to redirect_to(circle_template_url(presentation.circle, presentation.template))
      expect(presentation.template.reload.slides.first.title).to eq("Updated Slide")
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
      theme = create(:theme)
      presentation = create(:presentation, theme:)

      delete theme_presentation_url(presentation.circle, presentation.theme, presentation)

      expect(response).to redirect_to(theme_presentations_url(theme.circle, theme))
      expect(flash[:notice]).to eq(I18n.t("presentations.notices.destroyed"))
    end
  end
end
