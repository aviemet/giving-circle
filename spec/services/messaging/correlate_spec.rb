require "rails_helper"

RSpec.describe Messaging::Correlate do
  it "joins provider to-keyed outcomes back to membership ids" do
    membership_id = SecureRandom.uuid
    recipients = [
      Messaging::BatchRecipient.new(
        membership_id: membership_id,
        to: "+1 555 111 2222",
        body: "Hello",
      ),
    ]

    result = described_class.call(
      recipients: recipients,
      provider_outcomes_by_to: {
        "+15551112222" => {
          "status" => "sent",
          "code" => "queued",
          "provider_message_id" => "SMabc",
        },
      },
    )

    outcome = result.outcomes_by_membership_id[membership_id]
    expect(outcome.status).to eq("sent")
    expect(outcome.provider_message_id).to eq("SMabc")
    expect(outcome.recipient).to eq("+1 555 111 2222")
  end
end
