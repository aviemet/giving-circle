require "rails_helper"
require_relative "../../../support/devise"

RSpec.describe "Api::Presentations::Interactions", type: :request do
  login_super_admin

  let(:circle) { @admin.circles.first }
  let(:theme) { create(:theme, circle: circle) }
  let(:presentation) { create(:presentation, theme: theme, active: true) }
  let!(:first_interaction) do
    create(:presentation_interaction, presentation: presentation, name: "First", accepting_responses: false)
  end
  let!(:second_interaction) do
    create(:presentation_interaction, presentation: presentation, name: "Second", accepting_responses: true)
  end

  describe "PATCH update" do
    it "opens an interaction and closes siblings" do
      patch api_circle_presentation_interaction_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
        slug: first_interaction.slug,
      ), params: {
        presentation_interaction: { accepting_responses: true },
      }

      expect(response).to have_http_status(:accepted)
      expect(first_interaction.reload.accepting_responses).to be(true)
      expect(second_interaction.reload.accepting_responses).to be(false)

      body = response.parsed_body
      expect(body["interaction"]["accepting_responses"]).to be(true)
      expect(body["interactions"].pluck("accepting_responses")).to contain_exactly(true, false)
    end

    it "closes an interaction" do
      patch api_circle_presentation_interaction_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
        slug: second_interaction.slug,
      ), params: {
        presentation_interaction: { accepting_responses: false },
      }

      expect(response).to have_http_status(:accepted)
      expect(second_interaction.reload.accepting_responses).to be(false)
    end
  end
end
