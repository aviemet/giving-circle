require "rails_helper"

RSpec.describe Presentation::Interactions::EditSerializer do
  it "renders" do
    interaction = create(:presentation_interaction)

    expect(described_class.one(interaction)).to be_present
  end

  it "includes presentation finalist_count" do
    presentation = create(:presentation)
    presentation.settings.finalist_count = 3
    presentation.save!
    interaction = create(:presentation_interaction, presentation: presentation)

    payload = described_class.one(interaction)

    expect(payload[:finalist_count]).to eq(3)
  end
end
