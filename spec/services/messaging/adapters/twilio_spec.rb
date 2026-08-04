require "rails_helper"

RSpec.describe Messaging::Adapters::Twilio do
  it "maps provider responses into batch outcomes" do
    integration = create(:integration, :twilio)
    adapter = described_class.new(integration)
    recipient = Messaging::BatchRecipient.new(
      membership_id: SecureRandom.uuid,
      to: "+15551112222",
      body: "Hello",
    )

    response = instance_double(
      Net::HTTPSuccess,
      is_a?: true,
      body: { sid: "SMabc", status: "queued" }.to_json,
      code: "201",
    )
    allow(response).to receive(:is_a?).with(Net::HTTPSuccess).and_return(true)

    http = instance_double(Net::HTTP)
    allow(http).to receive(:request).and_return(response)
    allow(Net::HTTP).to receive(:start).and_yield(http)

    result = adapter.deliver_batch([recipient])
    outcome = result.outcomes_by_membership_id[recipient.membership_id]

    expect(outcome.status).to eq("sent")
    expect(outcome.provider_message_id).to eq("SMabc")
    expect(outcome.code).to eq("queued")
  end
end
