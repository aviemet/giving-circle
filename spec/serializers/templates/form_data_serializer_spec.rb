require "rails_helper"

RSpec.describe Templates::FormDataSerializer do
  it "renders" do
    template = create(:template)
    create(:slide_parent, parentable: template)

    expect(described_class.one(template)).to be_present
  end
end
