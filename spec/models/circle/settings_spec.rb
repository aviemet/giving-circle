require "rails_helper"

RSpec.describe Circle::Settings do
  it "defaults primary_color to blue" do
    circle = create(:circle, settings: {})

    expect(circle.settings.primary_color).to eq("blue")
  end

  it "reads and writes primary_color on the circle settings jsonb" do
    circle = create(:circle, settings: { "primary_color" => "teal" })

    expect(circle.settings.primary_color).to eq("teal")

    circle.settings.primary_color = "grape"
    circle.save!

    expect(circle.reload.settings.primary_color).to eq("grape")
  end
end
