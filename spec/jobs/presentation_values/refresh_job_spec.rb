require "rails_helper"

RSpec.describe PresentationValues::RefreshJob do
  before do
    PresentationValues::RedisStore.reset!
  end

  it "schedules another refresh when the lock is not acquired" do
    presentation = create(:presentation, active: true)
    allow(PresentationValues::Cache).to receive(:acquire_lock).with(presentation.id).and_return(false)
    expect(PresentationValues::Cache).to receive(:schedule_refresh).with(presentation.id)

    described_class.perform_now(presentation.id)
  end

  it "reschedules when still inside the debounce window" do
    presentation = create(:presentation, active: true)
    PresentationValues::Cache.schedule_refresh(presentation.id)
    allow(PresentationValues::Cache).to receive(:within_debounce_window?).and_return(true)
    expect(PresentationValues::Cache).to receive(:reschedule_if_too_soon).with(presentation.id, kind_of(Float))

    described_class.perform_now(presentation.id)
  end

  it "broadcasts when the redis snapshot changes" do
    presentation = create(:presentation, active: true)
    org = create(:org, circle: presentation.circle)
    create(:presentations_org, presentation: presentation, org: org)
    membership = create(:membership, circle: presentation.circle)
    create(:presentations_membership, presentation: presentation, membership: membership)
    interaction = create(:presentation_interaction, presentation: presentation)
    create(
      :presentation_interaction_response,
      presentation_interaction: interaction,
      membership: membership,
      response_data: {
        allocations: [{ org_id: org.id, amount_cents: 1_000 }],
      },
    )
    PresentationValues::Cache.write_if_changed(presentation.id, { allocated_totals: [] })
    PresentationValues::Cache.schedule_refresh(presentation.id)
    allow(PresentationValues::Cache).to receive(:within_debounce_window?).and_return(false)

    expect(PresentationValuesChannel).to receive(:broadcast).with(
      presentation,
      hash_including(
        allocated_totals: [
          hash_including(org_id: org.id, allocated_cents: 1_000),
        ],
      ),
    )

    described_class.perform_now(presentation.id)
  end

  it "does not broadcast when the snapshot is unchanged" do
    presentation = create(:presentation, active: true)
    create(:presentation_interaction, presentation: presentation, config: { "fields" => [], "outputs" => [] })
    values = PresentationValues::Aggregator.call(presentation)
    PresentationValues::Cache.write_if_changed(presentation.id, values)
    PresentationValues::Cache.schedule_refresh(presentation.id)
    allow(PresentationValues::Cache).to receive(:within_debounce_window?).and_return(false)

    expect(PresentationValuesChannel).not_to receive(:broadcast)

    described_class.perform_now(presentation.id)
  end

  it "schedules another refresh when dirty_at advances during the run" do
    presentation = create(:presentation, active: true)
    PresentationValues::Cache.schedule_refresh(presentation.id)
    allow(PresentationValues::Cache).to receive(:within_debounce_window?).and_return(false)
    allow(PresentationValues::Cache).to receive(:read_dirty_at).and_return(1.0, 2.0)
    expect(PresentationValues::Cache).to receive(:schedule_refresh).with(presentation.id)

    described_class.perform_now(presentation.id)
  end

  it "clears first_dirty_at when dirty_at did not advance" do
    presentation = create(:presentation, active: true)
    PresentationValues::Cache.schedule_refresh(presentation.id)
    allow(PresentationValues::Cache).to receive(:within_debounce_window?).and_return(false)
    allow(PresentationValues::Cache).to receive(:read_dirty_at).and_return(1.0, 1.0)
    expect(PresentationValues::Cache).to receive(:clear_first_dirty_at).with(presentation.id)

    described_class.perform_now(presentation.id)
  end
end
