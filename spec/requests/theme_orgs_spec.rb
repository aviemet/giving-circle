require "rails_helper"
require_relative "../support/devise"

RSpec.describe "ThemeOrgs", type: :request do
  def invalid_attributes
    { org: { name: "" } }
  end

  describe "GET /index" do
    login_super_admin

    it "renders a successful response" do
      theme = create(:theme, circle: @admin.circles.first)
      org = create(:org, circle: @admin.circles.first)
      create(:themes_org, { org:, theme: })

      get theme_orgs_url(org.circle, theme)

      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    login_super_admin

    it "renders a successful response" do
      theme = create(:theme, circle: @admin.circles.first)
      org = create(:org, circle: @admin.circles.first)
      create(:themes_org, { org:, theme: })

      get theme_org_url(theme.circle, theme, org)

      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    login_super_admin

    it "renders a successful response" do
      theme = create(:theme, circle: @admin.circles.first)

      get new_theme_org_url(theme.circle, theme)

      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    login_super_admin

    it "renders a successful response" do
      theme = create(:theme, circle: @admin.circles.first)
      org = create(:org, circle: @admin.circles.first)
      create(:themes_org, { org:, theme: })

      get edit_theme_org_url(theme.circle, theme, org)

      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    login_super_admin

    # TODO: This needs to test sending an ask value
    context "with valid parameters" do
      context "when adding a new org to the theme" do
        it "creates a new Org and adds it to a theme" do
          theme = create(:theme, circle: @admin.circles.first)

          expect {
            post theme_orgs_url(theme.circle, theme), params: {
              org: attributes_for(:org, theme:),
              theme:
            }
          }.to change(Org, :count).by(1)
            .and change(ThemesOrg, :count).by(1)
        end

        it "redirects to the created org" do
          theme = create(:theme, circle: @admin.circles.first)

          post theme_orgs_url(theme.circle, theme), params: { org: attributes_for(:org, theme:) }

          expect(response).to redirect_to(theme_org_url(theme.circle, theme, Org.last))
          expect(flash[:notice]).to eq(I18n.t("theme_orgs.notices.created"))
        end
      end
    end

    context "with invalid parameters" do
      it "does not create a new Org" do
        theme = create(:theme)

        expect {
          post theme_orgs_url(theme.circle, theme), params: invalid_attributes
        }.not_to change(Org, :count)
      end

      it "redirects back to the new org page" do
        theme = create(:theme)

        post theme_orgs_url(theme.circle, theme), params: invalid_attributes

        expect(response).to redirect_to(new_theme_org_url(theme.circle, theme))
      end

    end
  end

  describe "PATCH /update" do
    login_super_admin

    context "with valid parameters" do
      it "updates the requested org" do
        theme = create(:theme, circle: @admin.circles.first)
        org = create(:org, circle: @admin.circles.first)
        create(:themes_org, theme:, org:)
        new_name = "Updated Org In Theme"

        patch theme_org_url(theme.circle, theme, org), params: { org: { name: new_name, description: org.description } }

        expect(org.reload.name).to eq(new_name)
      end

      it "redirects to the org" do
        theme = create(:theme, circle: @admin.circles.first)
        org = create(:org, circle: @admin.circles.first)
        create(:themes_org, theme:, org:)

        patch theme_org_url(theme.circle, theme, org), params: { org: { name: org.name, description: org.description } }

        expect(response).to redirect_to(theme_org_url(theme.circle, theme, org))
      end
    end

    context "with invalid parameters" do
      it "redirects back to the edit org page" do
        theme = create(:theme, circle: @admin.circles.first)
        org = create(:org, circle: @admin.circles.first)
        create(:themes_org, theme:, org:)

        patch theme_org_url(theme.circle, theme, org), params: invalid_attributes

        expect(response).to redirect_to(edit_theme_org_url(theme.circle, theme, org))
      end
    end
  end

  describe "DELETE /destroy" do
    login_super_admin

    it "removes the org from the theme" do
      theme = create(:theme, circle: @admin.circles.first)
      org = create(:org, circle: @admin.circles.first)
      create(:themes_org, theme:, org:)

      expect {
        delete theme_org_url(theme.circle, theme, org)
      }.to change { ThemesOrg.where(theme:, org:).count }.by(-1)
    end

    it "redirects to the orgs list" do
      theme = create(:theme, circle: @admin.circles.first)
      org = create(:org, circle: @admin.circles.first)
      create(:themes_org, theme:, org:)

      delete theme_org_url(theme.circle, theme, org)

      expect(response).to redirect_to(theme_orgs_url(theme.circle, theme))
    end
  end
end
