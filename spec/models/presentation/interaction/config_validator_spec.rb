require "rails_helper"

RSpec.describe Presentation::Interaction::ConfigValidator do
  let(:presentation) { create(:presentation) }

  it "accepts a valid allocation round config" do
    interaction = build(
      :presentation_interaction,
      presentation: presentation,
      config: InteractionConfigFixtures::ALLOCATION_ROUND,
    )

    expect(interaction).to be_valid
  end

  it "accepts a valid finalist vote config" do
    interaction = build(
      :presentation_interaction,
      presentation: presentation,
      config: InteractionConfigFixtures::FINALIST_VOTE,
    )

    expect(interaction).to be_valid
  end

  it "rejects duplicate field keys" do
    interaction = build(
      :presentation_interaction,
      presentation: presentation,
      config: {
        "fields" => [
          { "key" => "vote", "type" => "text", "label" => "Vote" },
          { "key" => "vote", "type" => "text", "label" => "Duplicate" },
        ],
        "outputs" => [],
      },
    )

    expect(interaction).not_to be_valid
    expect(interaction.errors[:config]).to be_present
  end

  it "rejects incompatible reducer and field type" do
    interaction = build(
      :presentation_interaction,
      presentation: presentation,
      config: {
        "fields" => [
          { "key" => "note", "type" => "text", "label" => "Note" },
        ],
        "outputs" => [
          {
            "metric" => "allocated_totals",
            "source_field" => "note",
            "reducer" => "sum_by_org",
          },
        ],
      },
    )

    expect(interaction).not_to be_valid
    expect(interaction.errors[:config].join).to include("not compatible")
  end
end
