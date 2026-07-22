require "rails_helper"

RSpec.describe PresentationValuesChannel, type: :channel do
  let(:presentation) { create(:presentation) }
  let(:org) { create(:org, circle: presentation.circle) }

  before do
    PresentationValues::RedisStore.reset!
    create(:presentations_org, presentation: presentation, org: org)
    create(:presentation_interaction, presentation: presentation)
  end

  it "subscribes and streams for the presentation" do
    subscribe(presentation_id: presentation.id)

    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_for(presentation)
  end

  it "transmits presentation values on subscribe" do
    subscribe(presentation_id: presentation.id)

    expect(transmissions.last).to include(
      "type" => "presentation_values_updated",
      "presentation_values" => {
        "allocated_totals" => [
          {
            "org_id" => org.id,
            "allocated_cents" => 0,
            "currency" => "USD",
          },
        ],
        "vote_counts" => [],
        "money_totals" => [],
        "rank_totals" => [],
      },
    )
  end
end
