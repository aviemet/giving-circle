require "rails_helper"

RSpec.describe Slides::PersistedSerializer do
  it "includes thumbnail_url when a thumbnail is attached" do
    slide = create(:slide)
    slide.thumbnail.attach(
      io: StringIO.new("img"),
      filename: "thumb.jpg",
      content_type: "image/jpeg",
    )

    payload = described_class.one(slide)

    expect(payload[:thumbnail_url] || payload["thumbnail_url"]).to include(
      "/rails/active_storage/blobs/redirect/",
    )
  end

  it "omits thumbnail_url when no thumbnail is attached" do
    slide = create(:slide)

    payload = described_class.one(slide)

    expect(payload[:thumbnail_url] || payload["thumbnail_url"]).to be_nil
  end
end
