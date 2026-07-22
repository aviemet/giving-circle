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
end
