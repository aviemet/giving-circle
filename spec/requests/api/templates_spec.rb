require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Api::Templates", type: :request do
  describe "POST /api/circles/:circle_slug/templates" do
    login_super_admin

    it "responds successfully" do
      circle = @admin.circles.first

      post api_circle_templates_path(circle_slug: circle.slug)

      expect(response).to have_http_status(:no_content)
    end
  end

  describe "PATCH /api/circles/:circle_slug/templates/:slug" do
    login_super_admin

    it "loads the template via friendly find and responds" do
      circle = @admin.circles.first
      template = create(:template, circle:)

      patch api_circle_template_path(circle_slug: circle.slug, slug: template.slug)

      expect(response).to have_http_status(:no_content)
    end
  end

  describe "DELETE /api/circles/:circle_slug/templates/:slug" do
    login_super_admin

    it "loads the template via friendly find and responds" do
      circle = @admin.circles.first
      template = create(:template, circle:)

      delete api_circle_template_path(circle_slug: circle.slug, slug: template.slug)

      expect(response).to have_http_status(:no_content)
    end
  end
end
