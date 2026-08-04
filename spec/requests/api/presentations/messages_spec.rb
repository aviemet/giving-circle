require "rails_helper"
require_relative "../../../support/devise"

RSpec.describe "Api::Presentations::Messages", type: :request do
  login_super_admin

  let(:circle) { @admin.circles.first }
  let(:theme) { create(:theme, circle: circle) }
  let(:presentation) { create(:presentation, theme: theme) }
  let(:integration) { create(:integration, circle: circle) }
  let(:message) do
    create(
      :presentation_message,
      presentation: presentation,
      integration: integration,
      status: "ready",
    )
  end

  describe "GET show" do
    it "returns message send status" do
      get api_circle_presentation_message_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
        slug: message.slug,
      )

      expect(response).to have_http_status(:ok)
      body = response.parsed_body
      expect(body["presentation_message"]["slug"]).to eq(message.slug)
      expect(body["presentation_message"]["status"]).to eq("ready")
      expect(body["presentation_message"]["delivery_results"]).to eq({})
    end
  end

  describe "POST send_message" do
    it "starts a send and returns sending status" do
      expect {
        post send_api_circle_presentation_message_path(
          circle_slug: circle.slug,
          presentation_slug: presentation.slug,
          slug: message.slug,
        )
      }.to have_enqueued_job(Messaging::SendPresentationMessageJob).with(message.id, nil)

      expect(response).to have_http_status(:accepted)
      expect(message.reload.status).to eq("sending")
      expect(response.parsed_body["presentation_message"]["status"]).to eq("sending")
    end

    it "enqueues a send limited to membership_ids" do
      membership = create(:membership, circle: circle)
      create(:presentations_membership, presentation: presentation, membership: membership)

      expect {
        post send_api_circle_presentation_message_path(
          circle_slug: circle.slug,
          presentation_slug: presentation.slug,
          slug: message.slug,
        ), params: { membership_ids: [membership.id] }
      }.to have_enqueued_job(Messaging::SendPresentationMessageJob).with(
        message.id,
        [membership.id.to_s],
      )

      expect(response).to have_http_status(:accepted)
    end

    it "returns unprocessable content when the message is not ready" do
      message.update!(status: "finished", delivery_results: { "_batch" => { "status" => "failed" } })

      post send_api_circle_presentation_message_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
        slug: message.slug,
      )

      expect(response).to have_http_status(:unprocessable_content)
      expect(response.parsed_body["error"]).to be_present
      expect(response.parsed_body["presentation_message"]["status"]).to eq("finished")
    end
  end

  describe "GET preview_recipients" do
    it "returns pending delivery_results for the resolved recipients" do
      membership = create(:membership, circle: circle)
      create(:presentations_membership, presentation: presentation, membership: membership)
      create(:user, person: membership.person, email: "member@example.com")

      get preview_recipients_api_circle_presentation_message_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
        slug: message.slug,
      )

      expect(response).to have_http_status(:ok)
      results = response.parsed_body["delivery_results"]
      expect(results[membership.id.to_s]["recipient"]).to eq("member@example.com")
      expect(results[membership.id.to_s]["status"]).to eq("pending")
      expect(results[membership.id.to_s]["code"]).to eq("preview")
    end

    it "limits preview to membership_ids when provided" do
      membership = create(:membership, circle: circle)
      other = create(:membership, circle: circle, name: "Other")
      create(:presentations_membership, presentation: presentation, membership: membership)
      create(:presentations_membership, presentation: presentation, membership: other)
      create(:user, person: membership.person, email: "member@example.com")
      create(:user, person: other.person, email: "other@example.com")

      get preview_recipients_api_circle_presentation_message_path(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
        slug: message.slug,
      ), params: { membership_ids: [membership.id] }

      expect(response).to have_http_status(:ok)
      results = response.parsed_body["delivery_results"]
      expect(results.keys).to eq([membership.id.to_s])
    end
  end
end
