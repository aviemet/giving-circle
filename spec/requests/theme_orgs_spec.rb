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
            .and change(ThemeOrg, :count).by(1)
        end

        it "redirects to the created org" do
          theme = create(:theme, circle: @admin.circles.first)

          post theme_orgs_url(theme.circle, theme), params: { org: attributes_for(:org, theme:) }

          expect(response).to redirect_to(org_url(Org.last))
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
      it "updates the requested org and theme_org" do
        theme = create(:theme, { circle: @admin.circles.first })
        org = create(:org, { circle: @admin.circles.first })
        theme_org = create(:themes_org, theme:, org:)

        new_attributes = {
          theme_org: {
            ask_cents: 30000000,
            org_attributes: attributes_for(:org),
          }
        }

        patch theme_org_url(theme.circle, theme, org), params: new_attributes
        theme_org.reload

        expect(org.name).to eq(new_attributes[:org][:name])
        expect(theme_org.ask_cents).to eq(new_attributes[:theme_org][:ask_cents])
      end

      it "redirects to the org" do
        org = Org.create! valid_attributes
        patch theme_org_url(org), params: { org: new_attributes }
        org.reload
        expect(response).to redirect_to(theme_org_url(org))
      end
    end

    context "with invalid parameters" do

      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        org = Org.create! valid_attributes
        patch theme_org_url(org), params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

  describe "DELETE /destroy" do
    login_super_admin

    it "destroys the requested org" do
      org = Org.create! valid_attributes
      expect {
        delete theme_org_url(org)
      }.to change(Org, :count).by(-1)
    end

    it "redirects to the orgs list" do
      org = Org.create! valid_attributes
      delete theme_org_url(org)
      expect(response).to redirect_to(theme_orgs_url)
    end
  end
end
