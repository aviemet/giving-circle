require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "/settings/branding", type: :request do
  describe "GET /settings/:circle_slug/branding" do
    login_super_admin

    it "renders a successful response" do
      circle = @admin.circles.first

      get settings_branding_path(circle_slug: circle.slug)

      expect(response).to be_successful
    end
  end

  describe "PATCH /settings/:circle_slug/branding" do
    login_super_admin

    it "saves the primary color to circle settings" do
      circle = @admin.circles.first

      patch settings_branding_path(circle_slug: circle.slug), params: { settings: { primary_color: "grape" } }

      expect(response).to redirect_to(settings_branding_path(circle_slug: circle.slug))
      expect(circle.reload.settings.primary_color).to eq("grape")
    end

    it "rejects unsupported colors" do
      circle = @admin.circles.first

      patch settings_branding_path(circle_slug: circle.slug), params: { settings: { primary_color: "not-a-color" } }

      expect(response).to redirect_to(settings_branding_path(circle_slug: circle.slug))
      expect(circle.reload.settings.primary_color).to eq("blue")
    end

    it "redirects with errors when circle save fails" do
      circle = @admin.circles.first
      allow_any_instance_of(Circle).to receive(:save).and_return(false)
      allow_any_instance_of(Circle).to receive(:errors).and_return(
        ActiveModel::Errors.new(circle).tap { |errors| errors.add(:name, "invalid") },
      )

      patch settings_branding_path(circle_slug: circle.slug), params: { settings: { primary_color: "grape" } }

      expect(response).to redirect_to(settings_branding_path(circle_slug: circle.slug))
    end
  end
end
