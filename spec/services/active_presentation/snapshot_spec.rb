require "rails_helper"

RSpec.describe ActivePresentation::Snapshot do
  it "includes element_controls from the presentation" do
    presentation = create(:presentation, element_controls: {
      "slide-id" => {
        "timer-1" => {
          "Timer" => {
            "duration" => { "minutes" => 3, "seconds" => 0 },
          },
        },
      },
    },)

    result = described_class.call(presentation)

    expect(result[:element_controls]).to eq(presentation.element_controls)
  end
end
