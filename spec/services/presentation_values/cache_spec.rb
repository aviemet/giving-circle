require "rails_helper"

RSpec.describe PresentationValues::Cache do
  before do
    PresentationValues::RedisStore.reset!
  end

  describe ".write_if_changed" do
    it "writes when the snapshot changes" do
      presentation_id = SecureRandom.uuid
      payload = { allocated_totals: [] }

      expect(described_class.write_if_changed(presentation_id, payload)).to eq(payload)
      expect(described_class.write_if_changed(presentation_id, payload)).to be_nil
    end
  end

  describe ".schedule_refresh" do
    it "enqueues a refresh job for an active presentation" do
      presentation = create(:presentation, active: true)

      expect {
        described_class.schedule_refresh(presentation.id)
      }.to have_enqueued_job(PresentationValues::RefreshJob).with(presentation.id)
    end

    it "does not enqueue for an inactive presentation" do
      presentation = create(:presentation, active: false)

      expect {
        described_class.schedule_refresh(presentation.id)
      }.not_to have_enqueued_job(PresentationValues::RefreshJob)
    end
  end
end
