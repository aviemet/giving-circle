require "rails_helper"

RSpec.describe Slides::IndexSerializer do
  it "renders" do
    slide = create(:slide)

    expect(described_class.one(slide)).to be_present
  end
end
