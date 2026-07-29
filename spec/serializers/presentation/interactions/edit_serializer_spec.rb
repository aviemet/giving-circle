require "rails_helper"

RSpec.describe Presentation::Interactions::EditSerializer do
  it "renders" do
    interaction = create(:presentation_interaction)

    expect(described_class.one(interaction)).to be_present
  end
end
