require "rails_helper"

RSpec.describe Presentation::Interaction::ConfigValidator do
  it "accepts a valid allocation round config" do
    interaction = build(
      :presentation_interaction,
      presentation: create(:presentation),
      config: InteractionConfigFixtures::ALLOCATION_ROUND,
    )

    expect(interaction).to be_valid
  end

  it "accepts a valid finalist vote config" do
    interaction = build(
      :presentation_interaction,
      presentation: create(:presentation),
      config: InteractionConfigFixtures::FINALIST_VOTE,
    )

    expect(interaction).to be_valid
  end

  it "rejects blank config" do
    interaction = create(:presentation_interaction)
    interaction.update_column(:config, {})

    expect(interaction).not_to be_valid
    expect(interaction.errors[:config]).to be_present
  end

  it "rejects when fields are not an array" do
    interaction = build(
      :presentation_interaction,
      presentation: create(:presentation),
      config: { "fields" => {}, "outputs" => [] },
    )

    expect(interaction).not_to be_valid
    expect(interaction.errors[:config].join).to include("must be an array")
  end

  it "rejects duplicate field keys" do
    interaction = build(
      :presentation_interaction,
      presentation: create(:presentation),
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

  it "rejects invalid key format, blank label, and unknown type" do
    interaction = build(
      :presentation_interaction,
      presentation: create(:presentation),
      config: {
        "fields" => [
          { "key" => "Bad-Key", "type" => "not_real", "label" => "" },
        ],
        "outputs" => [],
      },
    )

    expect(interaction).not_to be_valid
    messages = interaction.errors[:config].join(" ")
    expect(messages).to include("key")
    expect(messages).to include("label")
    expect(messages).to include("not a known field type")
  end

  it "rejects number bounds and select choice option errors" do
    interaction = build(
      :presentation_interaction,
      presentation: create(:presentation),
      config: {
        "fields" => [
          {
            "key" => "count",
            "type" => "number",
            "label" => "Count",
            "options" => { "min" => 10, "max" => 1 },
          },
          {
            "key" => "choice",
            "type" => "single_select",
            "label" => "Choice",
            "options" => { "choices" => [] },
          },
        ],
        "outputs" => [],
      },
    )

    expect(interaction).not_to be_valid
    messages = interaction.errors[:config].join(" ")
    expect(messages).to include("less than or equal")
    expect(messages).to include("choices")
  end

  it "rejects field groups without nested fields" do
    interaction = build(
      :presentation_interaction,
      presentation: create(:presentation),
      config: {
        "fields" => [
          {
            "key" => "group",
            "type" => "field_group",
            "label" => "Group",
            "options" => { "min" => 1 },
            "fields" => [],
          },
        ],
        "outputs" => [],
      },
    )

    expect(interaction).not_to be_valid
    expect(interaction.errors[:config].join).to include("fields")
  end

  it "rejects when outputs are not an array" do
    interaction = build(
      :presentation_interaction,
      presentation: create(:presentation),
      config: {
        "fields" => [{ "key" => "note", "type" => "text", "label" => "Note" }],
        "outputs" => {},
      },
    )

    expect(interaction).not_to be_valid
    expect(interaction.errors[:config].join).to include("config.outputs")
  end

  it "rejects incompatible reducer and field type" do
    interaction = build(
      :presentation_interaction,
      presentation: create(:presentation),
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

  it "rejects missing source fields and unknown metrics" do
    interaction = build(
      :presentation_interaction,
      presentation: create(:presentation),
      config: {
        "fields" => [
          { "key" => "note", "type" => "text", "label" => "Note" },
        ],
        "outputs" => [
          {
            "metric" => "not_a_metric",
            "source_field" => "missing",
            "reducer" => "sum_money",
          },
        ],
      },
    )

    expect(interaction).not_to be_valid
    messages = interaction.errors[:config].join(" ")
    expect(messages).to include("not a known metric")
    expect(messages).to include("source_field")
  end

  it "rejects non-boolean repeatable and non-integer group bounds" do
    interaction = build(
      :presentation_interaction,
      presentation: create(:presentation),
      config: {
        "fields" => [
          {
            "key" => "group",
            "type" => "field_group",
            "label" => "Group",
            "options" => { "repeatable" => "yes", "min" => "1", "max" => 2.5 },
            "fields" => [
              { "key" => "note", "type" => "text", "label" => "Note" },
            ],
          },
        ],
        "outputs" => [],
      },
    )

    expect(interaction).not_to be_valid
    messages = interaction.errors[:config].join(" ")
    expect(messages).to include("repeatable")
    expect(messages).to include("integer")
  end

  it "rejects blank field keys" do
    interaction = build(
      :presentation_interaction,
      presentation: create(:presentation),
      config: {
        "fields" => [
          { "key" => "", "type" => "text", "label" => "Note" },
        ],
        "outputs" => [],
      },
    )

    expect(interaction).not_to be_valid
    expect(interaction.errors[:config].join).to include("key")
  end

  it "rejects blank reducers when source field exists" do
    interaction = build(
      :presentation_interaction,
      presentation: create(:presentation),
      config: {
        "fields" => [
          { "key" => "note", "type" => "text", "label" => "Note" },
        ],
        "outputs" => [
          {
            "metric" => "allocated_totals",
            "source_field" => "note",
            "reducer" => "",
          },
        ],
      },
    )

    expect(interaction).not_to be_valid
    expect(interaction.errors[:config].join).to include("reducer")
  end

  it "rejects non-string select choices and blank metric source and unknown reducer" do
    interaction = build(
      :presentation_interaction,
      presentation: create(:presentation),
      config: {
        "fields" => [
          {
            "key" => "choice",
            "type" => "single_select",
            "label" => "Choice",
            "options" => { "choices" => [1, "ok"] },
          },
          { "key" => "note", "type" => "text", "label" => "Note" },
        ],
        "outputs" => [
          { "metric" => "", "source_field" => "note", "reducer" => "sum_money" },
          { "metric" => "allocated_totals", "source_field" => "", "reducer" => "sum_by_org" },
          {
            "metric" => "allocated_totals",
            "source_field" => "note",
            "reducer" => "not_a_reducer",
          },
        ],
      },
    )

    expect(interaction).not_to be_valid
    messages = interaction.errors[:config].join(" ")
    expect(messages).to include("choices")
    expect(messages).to include("metric")
    expect(messages).to include("source_field")
    expect(messages).to include("reducer")
  end
end
