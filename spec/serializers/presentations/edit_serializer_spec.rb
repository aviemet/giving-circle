require "rails_helper"

RSpec.describe Presentations::EditSerializer do
  it "renders" do
    presentation = create(:presentation)
    create(:slide_parent, parentable: presentation)

    expect(described_class.one(presentation)).to be_present
  end
end
