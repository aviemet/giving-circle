require "rails_helper"

RSpec.describe Presentations::ElementControls::Update do
  let(:presentation) { create(:presentation) }
  let(:slide) { create(:slide) }

  before do
    presentation.slides << slide
  end

  it "merges a control value into element_controls" do
    described_class.call(
      presentation: presentation,
      slide_id: slide.id,
      element_id: "timer-1",
      element_type: "Timer",
      control: "duration",
      value: { "minutes" => 5, "seconds" => 30 },
    )

    expect(presentation.reload.element_controls).to eq(
      slide.id => {
        "timer-1" => {
          "Timer" => {
            "duration" => { "minutes" => 5, "seconds" => 30 },
          },
        },
      },
    )
  end

  it "raises when the slide does not belong to the presentation" do
    other_slide = create(:slide)

    expect {
      described_class.call(
        presentation: presentation,
        slide_id: other_slide.id,
        element_id: "timer-1",
        element_type: "Timer",
        control: "duration",
        value: { "minutes" => 1, "seconds" => 0 },
      )
    }.to raise_error(Presentations::ElementControls::Update::SlideNotFound)
  end
end
