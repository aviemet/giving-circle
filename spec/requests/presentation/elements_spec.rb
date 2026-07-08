require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Presentations::Elements", type: :request do
  let(:presentation) { create(:presentation, theme: create(:theme, circle: @admin.circles.first)) }

  let(:valid_attributes) do
    attributes_for(:presentation_element)
  end

  let(:invalid_attributes) do
    { name: nil }
  end

  describe "GET /index" do
    login_super_admin

    it "renders a successful response" do
      create(:presentation_element)

      get theme_presentation_elements_path(presentation.circle, presentation.theme, presentation)

      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    login_super_admin

    it "renders a successful response" do
      element = create(:presentation_element)

      get theme_presentation_element_path(
        presentation.circle,
        presentation.theme,
        presentation,
        element,
      )

      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    login_super_admin

    it "renders a successful response" do
      get new_theme_presentation_element_path(presentation.circle, presentation.theme, presentation)

      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    login_super_admin

    it "renders a successful response" do
      element = create(:presentation_element)

      get edit_theme_presentation_element_path(
        presentation.circle,
        presentation.theme,
        presentation,
        element,
      )

      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    login_super_admin

    context "with valid parameters" do
      it "creates a new Presentation::Element" do
        expect {
          post theme_presentation_elements_path(presentation.circle, presentation.theme, presentation),
            params: { presentation_element: valid_attributes }
        }.to change(Presentation::Element, :count).by(1)
      end

      it "redirects to the created presentation_element" do
        post theme_presentation_elements_path(presentation.circle, presentation.theme, presentation),
          params: { presentation_element: valid_attributes }

        expect(response).to redirect_to(
          theme_presentation_element_path(
            presentation.circle,
            presentation.theme,
            presentation,
            Presentation::Element.last,
          ),
        )
      end
    end

    context "with invalid parameters" do
      it "does not create a new Presentation::Element" do
        expect {
          post theme_presentation_elements_path(presentation.circle, presentation.theme, presentation),
            params: { presentation_element: invalid_attributes }
        }.not_to change(Presentation::Element, :count)
      end

      it "redirects back to the new element page" do
        post theme_presentation_elements_path(presentation.circle, presentation.theme, presentation),
          params: { presentation_element: invalid_attributes }

        expect(response).to redirect_to(
          new_theme_presentation_element_path(presentation.circle, presentation.theme, presentation),
        )
      end
    end
  end

  describe "PATCH /update" do
    login_super_admin

    context "with valid parameters" do
      it "updates the requested presentation_element" do
        element = create(:presentation_element, name: "Before")

        patch theme_presentation_element_path(
          presentation.circle,
          presentation.theme,
          presentation,
          element,
        ), params: { presentation_element: { name: "After" } }

        expect(element.reload.name).to eq("After")
      end

      it "redirects to the presentation_element" do
        element = create(:presentation_element)

        patch theme_presentation_element_path(
          presentation.circle,
          presentation.theme,
          presentation,
          element,
        ), params: { presentation_element: valid_attributes }

        expect(response).to redirect_to(
          theme_presentation_element_path(presentation.circle, presentation.theme, presentation, element),
        )
      end
    end

    context "with invalid parameters" do
      it "redirects back to the edit page" do
        element = create(:presentation_element)

        patch theme_presentation_element_path(
          presentation.circle,
          presentation.theme,
          presentation,
          element,
        ), params: { presentation_element: invalid_attributes }

        expect(response).to redirect_to(
          edit_theme_presentation_element_path(presentation.circle, presentation.theme, presentation, element),
        )
      end
    end
  end

  describe "DELETE /destroy" do
    login_super_admin

    it "destroys the requested presentation_element" do
      element = create(:presentation_element)

      expect {
        delete theme_presentation_element_path(
          presentation.circle,
          presentation.theme,
          presentation,
          element,
        )
      }.to change(Presentation::Element, :count).by(-1)
    end

    it "redirects to the presentation_elements list" do
      element = create(:presentation_element)

      delete theme_presentation_element_path(
        presentation.circle,
        presentation.theme,
        presentation,
        element,
      )

      expect(response).to redirect_to(
        theme_presentation_elements_path(presentation.circle, presentation.theme, presentation),
      )
    end
  end
end
