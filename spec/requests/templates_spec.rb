require "rails_helper"
require_relative "../support/devise"

RSpec.describe "/templates", type: :request do
  describe "GET /show" do
    login_super_admin

    it "renders a successful response with template slides" do
      circle = @admin.circles.first
      template = create(:template, circle:)
      slide = create(:slide, title: "Intro")
      template.slides << slide

      get settings_template_url(circle, template)

      expect(response).to be_successful
      expect(inertia).to render_component("Templates/Show")
    end
  end

  describe "GET /index" do
    login_super_admin

    it "renders a successful response when themes have orgs" do
      circle = @admin.circles.first
      theme = create(:theme, circle:)
      org = create(:org, circle:)
      create(:themes_org, theme:, org:)
      create(:template, circle:)

      get settings_templates_url(circle)

      expect(response).to be_successful
      expect(inertia).to render_component("Templates/Index")
    end
  end

  describe "GET /new" do
    login_super_admin

    it "creates a template and redirects to edit" do
      circle = @admin.circles.first

      expect {
        get new_settings_template_url(circle)
      }.to change(Template, :count).by(1)

      template = Template.last
      expect(response).to redirect_to(edit_settings_template_url(circle_slug: circle.slug, slug: template.slug))
      expect(template.name).to eq("New Template")
      expect(template.circle).to eq(circle)
    end
  end

  describe "GET /edit" do
    login_super_admin

    it "renders the template editor" do
      circle = @admin.circles.first
      template = create(:template, circle:)

      get edit_settings_template_url(circle, template)

      expect(response).to be_successful
      expect(inertia).to render_component("Templates/Edit")
    end
  end

  describe "POST /create" do
    login_super_admin

    it "creates a template and redirects to edit" do
      circle = @admin.circles.first

      expect {
        post settings_templates_url(circle), params: {
          template: { name: "Kickoff deck" },
        }
      }.to change(Template, :count).by(1)

      template = Template.last
      expect(template.name).to eq("Kickoff deck")
      expect(response).to redirect_to(edit_settings_template_path(circle.slug, template))
    end

    it "redirects with errors when save fails" do
      circle = @admin.circles.first
      allow_any_instance_of(Template).to receive(:save).and_return(false)
      allow_any_instance_of(Template).to receive(:errors).and_return(
        ActiveModel::Errors.new(Template.new).tap { |errors| errors.add(:name, "invalid") },
      )

      post settings_templates_url(circle), params: {
        template: { name: "Kickoff deck" },
      }

      expect(response).to redirect_to(new_settings_template_path(circle.slug))
    end
  end

  describe "PATCH /update" do
    login_super_admin

    it "updates the template" do
      circle = @admin.circles.first
      template = create(:template, circle:, name: "Original")

      patch settings_template_url(circle, template), params: {
        template: { name: "Renamed" },
      }

      expect(template.reload.name).to eq("Renamed")
      expect(response).to redirect_to(edit_settings_template_path(circle, template))
    end

    it "redirects with errors when update fails" do
      circle = @admin.circles.first
      template = create(:template, circle:, name: "Original")
      allow_any_instance_of(Template).to receive(:update).and_return(false)
      allow_any_instance_of(Template).to receive(:errors).and_return(
        ActiveModel::Errors.new(template).tap { |errors| errors.add(:name, "invalid") },
      )

      patch settings_template_url(circle, template), params: {
        template: { name: "Renamed" },
      }

      expect(response).to redirect_to(edit_settings_template_path(circle, template))
    end
  end

  describe "DELETE /destroy" do
    login_super_admin

    it "destroys the template and redirects to index" do
      circle = @admin.circles.first
      template = create(:template, circle:)

      expect {
        delete settings_template_url(circle, template)
      }.to change(Template, :count).by(-1)

      expect(response).to redirect_to(settings_templates_path(circle))
    end
  end

  describe "GET old circle templates path" do
    login_super_admin

    it "redirects to settings templates" do
      circle = @admin.circles.first

      get "/#{circle.slug}/templates"

      expect(response).to redirect_to("/settings/#{circle.slug}/templates")
      expect(response).to have_http_status(:moved_permanently)
    end
  end
end
