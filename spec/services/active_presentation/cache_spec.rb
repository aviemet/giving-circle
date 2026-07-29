require "rails_helper"

RSpec.describe ActivePresentation::Cache do
  before do
    PresentationValues::RedisStore.reset!
  end

  describe ".schedule_refresh" do
    it "enqueues a refresh job for an active presentation" do
      presentation = create(:presentation, active: true)

      expect {
        described_class.schedule_refresh(presentation.id)
      }.to have_enqueued_job(ActivePresentation::RefreshJob).with(presentation.id)
    end

    it "does not enqueue for an inactive presentation" do
      presentation = create(:presentation, active: false)

      expect {
        described_class.schedule_refresh(presentation.id)
      }.not_to have_enqueued_job(ActivePresentation::RefreshJob)
    end
  end

  describe ".write_if_changed" do
    it "writes when the snapshot changes" do
      presentation_id = SecureRandom.uuid
      payload = { interactions: [] }

      expect(described_class.write_if_changed(presentation_id, payload)).to eq(payload)
      expect(described_class.write_if_changed(presentation_id, payload)).to be_nil
    end
  end

  describe ".fetch" do
    it "returns cached json when present" do
      presentation = create(:presentation, active: true)
      payload = { interactions: [{ id: "1" }] }
      described_class.write_if_changed(presentation.id, payload)

      expect(described_class.fetch(presentation.id)).to eq(payload)
    end

    it "builds and stores a snapshot when cache is empty" do
      presentation = create(:presentation, active: true)

      result = described_class.fetch(presentation.id)

      expect(result).to be_a(Hash)
      expect(described_class.fetch(presentation.id)).to eq(result)
    end
  end

  describe ".within_debounce_window? and .reschedule_if_too_soon" do
    it "detects the debounce window and reschedules" do
      presentation = create(:presentation, active: true)
      described_class.schedule_refresh(presentation.id)
      dirty_at = described_class.read_dirty_at(presentation.id)
      described_class.acquire_lock(presentation.id)

      expect(described_class.within_debounce_window?(presentation.id, dirty_at)).to be(true)

      expect {
        described_class.reschedule_if_too_soon(presentation.id, dirty_at)
      }.to have_enqueued_job(ActivePresentation::RefreshJob).with(presentation.id)
    end
  end
end
