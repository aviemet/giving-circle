require "rails_helper"

RSpec.describe PresentationValues::Composer do
  def setup_presentation
    presentation = create(:presentation)
    org = create(:org, circle: presentation.circle)
    create(:presentations_org, presentation: presentation, org: org, ask_cents: 10_000, ask_currency: "USD")
    [presentation, org]
  end

  it "composes funding_totals from selected metrics" do
    presentation, org = setup_presentation
    raw_snapshot = {
      pledge_totals: [{ org_id: org.id, pledge_cents: 2_000, currency: "USD" }],
      allocated_totals: [{ org_id: org.id, allocated_cents: 3_000, currency: "USD" }],
      finalist_org_ids: [org.id],
    }

    enriched = described_class.enrich(
      presentation,
      raw_snapshot,
      funding_basis: ["pledge_totals", "allocated_totals"],
    )

    expect(enriched[:funding_totals]).to contain_exactly(
      {
        org_id: org.id,
        funding_cents: 5_000,
        currency: "USD",
      },
    )
  end

  it "marks funded org ids when funding meets ask" do
    presentation, org = setup_presentation
    raw_snapshot = {
      allocated_totals: [{ org_id: org.id, allocated_cents: 10_000, currency: "USD" }],
      finalist_org_ids: [org.id],
    }

    enriched = described_class.enrich(
      presentation,
      raw_snapshot,
      funding_basis: ["allocated_totals"],
    )

    expect(enriched[:funded_org_ids]).to eq([org.id])
  end

  it "computes leverage remaining from presentation leverage funding basis" do
    presentation, org = setup_presentation
    raw_snapshot = {
      pledge_totals: [{ org_id: org.id, pledge_cents: 4_000, currency: "USD" }],
      allocated_totals: [{ org_id: org.id, allocated_cents: 2_000, currency: "USD" }],
      finalist_org_ids: [org.id],
    }

    enriched = described_class.enrich(presentation, raw_snapshot)

    expect(enriched[:leverage]).to include(
      remaining_cents: 4_000,
      total_ask_cents: 10_000,
      currency: "USD",
    )
  end
end
