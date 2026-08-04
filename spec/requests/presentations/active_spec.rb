require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Presentations::Active", type: :request do
  login_super_admin

  let(:circle) { @admin.circles.first }
  let(:theme) { create(:theme, circle: circle) }
  let(:presentation) { create(:presentation, theme: theme, active: true) }

  describe "GET controls index" do
    it "includes interactions for toggles" do
      interaction = create(:presentation_interaction, presentation: presentation, name: "Allocation")

      get theme_presentation_controls_path(circle, theme, presentation)

      expect(response).to be_successful
      expect(inertia).to render_component("Presentations/Active/Index")
      expect(inertia.props[:interactions].pluck("id")).to eq([interaction.id])
    end
  end

  describe "GET members" do
    it "includes presentation members with funds and email" do
      user = create(:user)
      membership = create(:membership, circle: circle, person: user.person, funds_cents: 50_000)
      create(:presentations_membership, presentation: presentation, membership: membership, funds_cents: 25_000)

      get theme_presentation_members_path(circle, theme, presentation)

      expect(response).to be_successful
      expect(inertia).to render_component("Presentations/Active/Members")
      member_row = inertia.props[:members].first
      expect(member_row["id"]).to eq(membership.id)
      expect(member_row["email"]).to eq(user.email)
      expect(member_row["funds"]["cents"]).to eq(50_000)
      expect(member_row["presentation_funds"]["cents"]).to eq(25_000)
    end
  end

  describe "GET overview" do
    it "renders the overview page" do
      get theme_presentation_overview_path(circle, theme, presentation)

      expect(response).to be_successful
      expect(inertia).to render_component("Presentations/Active/Overview")
    end
  end

  describe "GET messaging" do
    it "renders the active messaging send page" do
      get theme_presentation_admin_messaging_path(circle, theme, presentation)

      expect(response).to be_successful
      expect(inertia).to render_component("Presentations/Active/Messaging")
    end
  end

  describe "GET settings" do
    it "renders the admin settings page" do
      get theme_presentation_admin_settings_path(circle, theme, presentation)

      expect(response).to be_successful
      expect(inertia).to render_component("Presentations/Active/Settings")
    end
  end

  describe "GET public_show" do
    it "renders the public presentation view" do
      get circle_public_presentation_path(circle_slug: circle.slug, presentation_slug: presentation.slug)

      expect(response).to be_successful
      expect(inertia).to render_component("Presentations/Active/PublicShow")
    end
  end

  describe "GET public_memberships" do
    it "returns presentation memberships as json" do
      membership = create(:membership, circle: circle)
      create(:presentations_membership, presentation: presentation, membership: membership)

      get circle_public_presentation_memberships_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
      )

      expect(response).to be_successful
      expect(response.parsed_body["memberships"].pluck("id")).to include(membership.id)
    end
  end
end
