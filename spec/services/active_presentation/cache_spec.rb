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
end
