require "rails_helper"

RSpec.describe ActivePresentation::RefreshJob do
  before do
    PresentationValues::RedisStore.reset!
  end

  it "broadcasts when the redis snapshot changes" do
    presentation = create(:presentation, active: true)
    interaction = create(:presentation_interaction, presentation: presentation, accepting_responses: true)
    ActivePresentation::Cache.write_if_changed(presentation.id, { interactions: [] })
    ActivePresentation::Cache.schedule_refresh(presentation.id)
    allow(ActivePresentation::Cache).to receive(:within_debounce_window?).and_return(false)

    expect(ActivePresentationChannel).to receive(:broadcast_state).with(
      presentation,
      hash_including(
        interactions: [
          hash_including(
            id: interaction.id,
            slug: interaction.slug,
            accepting_responses: true,
          ),
        ],
      ),
    )

    described_class.perform_now(presentation.id)
  end

  it "does not broadcast when the snapshot is unchanged" do
    presentation = create(:presentation, active: true)
    create(:presentation_interaction, presentation: presentation, accepting_responses: false)
    snapshot = ActivePresentation::Snapshot.call(presentation)
    ActivePresentation::Cache.write_if_changed(presentation.id, snapshot)
    ActivePresentation::Cache.schedule_refresh(presentation.id)
    allow(ActivePresentation::Cache).to receive(:within_debounce_window?).and_return(false)

    expect(ActivePresentationChannel).not_to receive(:broadcast_state)

    described_class.perform_now(presentation.id)
  end

  it "reschedules when still inside the debounce window" do
    presentation = create(:presentation, active: true)
    ActivePresentation::Cache.schedule_refresh(presentation.id)
    allow(ActivePresentation::Cache).to receive(:within_debounce_window?).and_return(true)
    allow(ActivePresentation::Cache).to receive(:reschedule_if_too_soon).and_call_original

    described_class.perform_now(presentation.id)

    expect(ActivePresentation::Cache).to have_received(:reschedule_if_too_soon)
  end

  it "releases the lock when the presentation is inactive" do
    presentation = create(:presentation, active: false)
    ActivePresentation::Cache.schedule_refresh(presentation.id)
    allow(ActivePresentation::Cache).to receive(:within_debounce_window?).and_return(false)
    allow(ActivePresentation::Cache).to receive(:release_lock).and_call_original
    allow(ActivePresentation::Cache).to receive(:clear_first_dirty_at).and_call_original

    described_class.perform_now(presentation.id)

    expect(ActivePresentation::Cache).to have_received(:release_lock)
    expect(ActivePresentation::Cache).to have_received(:clear_first_dirty_at)
  end

  it "schedules another refresh when dirty_at advances during the run" do
    presentation = create(:presentation, active: true)
    create(:presentation_interaction, presentation: presentation)
    ActivePresentation::Cache.schedule_refresh(presentation.id)
    allow(ActivePresentation::Cache).to receive(:within_debounce_window?).and_return(false)
    allow(ActivePresentation::Cache).to receive(:read_dirty_at).and_return(1.0, 2.0)
    allow(ActivePresentation::Cache).to receive(:schedule_refresh).and_call_original

    described_class.perform_now(presentation.id)

    expect(ActivePresentation::Cache).to have_received(:schedule_refresh).at_least(:once)
  end
end
