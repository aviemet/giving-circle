require "rails_helper"

RSpec.describe Messaging::SendPresentationMessage do
  include ActiveJob::TestHelper

  it "enqueues a batch send and finishes with delivery_results" do
    presentation = create(:presentation)
    membership = create(:membership, circle: presentation.circle)
    create(:presentations_membership, presentation: presentation, membership: membership)
    create(:user, person: membership.person, email: "member@example.com")
    integration = create(:integration, circle: presentation.circle)
    message = create(:presentation_message, presentation: presentation, integration: integration)

    adapter = instance_double(Messaging::Adapters::Smtp)
    allow(Messaging::Registry).to receive(:adapter_for).and_return(adapter)
    allow(adapter).to receive(:deliver_batch) do |recipients|
      Messaging::BatchResult.new(
        recipients.map do |recipient|
          Messaging::RecipientOutcome.new(
            membership_id: recipient.membership_id,
            recipient: recipient.to,
            status: "sent",
            code: "250",
          )
        end,
      )
    end

    perform_enqueued_jobs do
      described_class.new(presentation_message: message).call
    end

    message.reload
    expect(message.status).to eq("finished")
    expect(message.delivery_results[membership.id.to_s]["status"]).to eq("sent")
    expect(message.delivery_results[membership.id.to_s]["recipient"]).to eq("member@example.com")
  end

  it "passes membership_ids through the job to limit recipients" do
    presentation = create(:presentation)
    membership = create(:membership, circle: presentation.circle)
    other = create(:membership, circle: presentation.circle, name: "Other")
    create(:presentations_membership, presentation: presentation, membership: membership)
    create(:presentations_membership, presentation: presentation, membership: other)
    create(:user, person: membership.person, email: "member@example.com")
    create(:user, person: other.person, email: "other@example.com")
    integration = create(:integration, circle: presentation.circle)
    message = create(:presentation_message, presentation: presentation, integration: integration)

    adapter = instance_double(Messaging::Adapters::Smtp)
    allow(Messaging::Registry).to receive(:adapter_for).and_return(adapter)
    allow(adapter).to receive(:deliver_batch) do |recipients|
      Messaging::BatchResult.new(
        recipients.map do |recipient|
          Messaging::RecipientOutcome.new(
            membership_id: recipient.membership_id,
            recipient: recipient.to,
            status: "sent",
            code: "250",
          )
        end,
      )
    end

    perform_enqueued_jobs do
      described_class.new(
        presentation_message: message,
        membership_ids: [membership.id],
      ).call
    end

    message.reload
    expect(message.status).to eq("finished")
    expect(message.delivery_results.keys).to eq([membership.id.to_s])
    expect(adapter).to have_received(:deliver_batch) do |recipients|
      expect(recipients.map(&:membership_id)).to eq([membership.id.to_s])
    end
  end
end
