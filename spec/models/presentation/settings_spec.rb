require "rails_helper"

RSpec.describe Presentation::Settings do
  let(:presentation) { create(:presentation) }

  it "defaults finalist_count to 5" do
    expect(presentation.settings.finalist_count).to eq(5)
  end

  it "reads and writes finalist_count on the presentation settings jsonb" do
    presentation.settings.finalist_count = 3
    presentation.save!

    presentation.reload
    expect(presentation.settings.finalist_count).to eq(3)
    expect(presentation.read_attribute(:settings)["finalist_count"]).to eq(3)
  end
end
