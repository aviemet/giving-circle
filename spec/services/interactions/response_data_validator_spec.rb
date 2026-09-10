require "rails_helper"

RSpec.describe Interactions::ResponseDataValidator do
  def build_response(interaction:, membership:, response_data:)
    build(
      :presentation_interaction_response,
      presentation_interaction: interaction,
      membership: membership,
      response_data: response_data,
    )
  end

  def setup_membership(interaction)
    membership = create(:membership, circle: interaction.presentation.circle)
    create(:presentations_membership, presentation: interaction.presentation, membership: membership)
    membership
  end

  it "accepts valid org money map response data" do
    interaction = create(:presentation_interaction)
    membership = setup_membership(interaction)
    response = build_response(
      interaction: interaction,
      membership: membership,
      response_data: {
        allocations: [
          { org_id: SecureRandom.uuid, amount_cents: 500 },
        ],
      },
    )

    expect(response).to be_valid
  end

  it "rejects unknown response keys" do
    interaction = create(:presentation_interaction)
    membership = setup_membership(interaction)
    response = build_response(
      interaction: interaction,
      membership: membership,
      response_data: {
        unknown_field: "value",
      },
    )

    expect(response).not_to be_valid
    expect(response.errors[:response_data]).to be_present
  end

  it "rejects when config fields are not an array" do
    interaction = create(:presentation_interaction)
    interaction.update_column(:config, { "fields" => {}, "outputs" => [] })
    membership = setup_membership(interaction)
    response = build_response(
      interaction: interaction,
      membership: membership,
      response_data: {},
    )

    expect(response).not_to be_valid
    expect(response.errors[:response_data].join).to include("must be an array")
  end

  it "rejects missing required field values" do
    interaction = create(
      :presentation_interaction,
      config: {
        "fields" => [{ "key" => "note", "type" => "text", "label" => "Note" }],
        "outputs" => [],
      },
    )
    membership = setup_membership(interaction)
    response = build_response(
      interaction: interaction,
      membership: membership,
      response_data: { note: "" },
    )

    expect(response).not_to be_valid
    expect(response.errors[:response_data].join).to include("is required")
  end

  it "rejects invalid text, number, boolean, and money values" do
    interaction = create(
      :presentation_interaction,
      config: {
        "fields" => [
          { "key" => "note", "type" => "text", "label" => "Note" },
          { "key" => "count", "type" => "number", "label" => "Count", "options" => { "min" => 1, "max" => 5 } },
          { "key" => "flag", "type" => "boolean", "label" => "Flag" },
          { "key" => "gift", "type" => "money", "label" => "Gift" },
        ],
        "outputs" => [],
      },
    )
    membership = setup_membership(interaction)
    response = build_response(
      interaction: interaction,
      membership: membership,
      response_data: {
        note: 12,
        count: 9,
        flag: "maybe",
        gift: "not-money",
      },
    )

    expect(response).not_to be_valid
    messages = response.errors[:response_data].join(" ")
    expect(messages).to include("must be a string")
    expect(messages).to include("at most")
    expect(messages).to include("must be a boolean")
    expect(messages).to include("must be a money object")
  end

  it "rejects invalid select and org_reference values" do
    interaction = create(
      :presentation_interaction,
      config: {
        "fields" => [
          {
            "key" => "choice",
            "type" => "single_select",
            "label" => "Choice",
            "options" => { "choices" => %w[a b] },
          },
          {
            "key" => "tags",
            "type" => "multi_select",
            "label" => "Tags",
            "options" => { "choices" => %w[x y] },
          },
          { "key" => "org", "type" => "org_reference", "label" => "Org" },
        ],
        "outputs" => [],
      },
    )
    membership = setup_membership(interaction)
    response = build_response(
      interaction: interaction,
      membership: membership,
      response_data: {
        choice: "c",
        tags: ["z"],
        org: 123,
      },
    )

    expect(response).not_to be_valid
    messages = response.errors[:response_data].join(" ")
    expect(messages).to include("must be one of the configured choices")
    expect(messages).to include("invalid choices")
    expect(messages).to include("must be an org id")
  end

  it "rejects org money map entries that exceed available funds" do
    interaction = create(:presentation_interaction)
    membership = create(:membership, circle: interaction.presentation.circle)
    create(
      :presentations_membership,
      presentation: interaction.presentation,
      membership: membership,
      funds_cents: 100,
    )
    org_id = SecureRandom.uuid
    response = build_response(
      interaction: interaction,
      membership: membership,
      response_data: {
        allocations: [{ org_id: org_id, amount_cents: 250 }],
      },
    )

    expect(response).not_to be_valid
    expect(response.errors[:response_data].join).to include("exceeds available funds")
  end

  it "rejects finalist vote totals that exceed available votes" do
    presentation = create(:presentation)
    membership = create(:membership, circle: presentation.circle)
    create(:presentations_membership, presentation: presentation, membership: membership)
    interaction = create(
      :presentation_interaction,
      presentation: presentation,
      interaction_ui_template: create(:interaction_ui_template, :finalist_vote),
      config: InteractionConfigFixtures::FINALIST_VOTE,
    )
    interaction.interaction_memberships.find_by!(membership_id: membership.id).update!(
      member_attributes: { "votes" => 3 },
    )
    response = build_response(
      interaction: interaction,
      membership: membership,
      response_data: {
        votes: [{ org_id: SecureRandom.uuid, amount_cents: 5 }],
      },
    )

    expect(response).not_to be_valid
    expect(response.errors[:response_data].join).to include("exceeds available votes")
  end

  it "rejects empty pledges and invalid ranked list entries" do
    presentation = create(:presentation)
    membership = create(:membership, circle: presentation.circle)
    create(:presentations_membership, presentation: presentation, membership: membership)
    pledges = create(
      :presentation_interaction,
      presentation: presentation,
      interaction_ui_template: create(:interaction_ui_template, :pledges),
      config: InteractionConfigFixtures::PLEDGES,
    )
    empty_pledge = build_response(
      interaction: pledges,
      membership: membership,
      response_data: { pledges: [], anonymous: false },
    )
    expect(empty_pledge).not_to be_valid
    expect(empty_pledge.errors[:response_data].join).to include("positive pledge amount")

    ranked = create(
      :presentation_interaction,
      presentation: presentation,
      config: {
        "fields" => [
          { "key" => "ranks", "type" => "org_ranked_list", "label" => "Ranks" },
        ],
        "outputs" => [],
      },
    )
    bad_rank = build_response(
      interaction: ranked,
      membership: membership,
      response_data: {
        ranks: [{ org_id: SecureRandom.uuid, rank: "nope" }],
      },
    )
    expect(bad_rank).not_to be_valid
    expect(bad_rank.errors[:response_data].join).to include("rank must be an integer")
  end

  it "rejects field groups below the minimum entry count" do
    interaction = create(
      :presentation_interaction,
      config: {
        "fields" => [
          {
            "key" => "group",
            "type" => "field_group",
            "label" => "Group",
            "options" => { "min" => 2 },
            "fields" => [
              { "key" => "note", "type" => "text", "label" => "Note" },
            ],
          },
        ],
        "outputs" => [],
      },
    )
    membership = setup_membership(interaction)
    response = build_response(
      interaction: interaction,
      membership: membership,
      response_data: {
        group: [{ note: "one" }],
      },
    )

    expect(response).not_to be_valid
    expect(response.errors[:response_data].join).to include("at least 2 entries")
  end

  it "rejects unknown field types" do
    interaction = create(:presentation_interaction)
    interaction.update_column(
      :config,
      {
        "fields" => [
          { "key" => "weird", "type" => "not_a_type", "label" => "Weird" },
        ],
        "outputs" => [],
      },
    )
    membership = setup_membership(interaction)
    response = build_response(
      interaction: interaction,
      membership: membership,
      response_data: { weird: "value" },
    )

    expect(response).not_to be_valid
    expect(response.errors[:response_data].join).to include("unknown field type")
  end

  it "rejects pledges for orgs that are not allowed" do
    presentation = create(:presentation)
    presentation.settings.finalist_count = 1
    presentation.save!
    allowed_org = create(:org, circle: presentation.circle)
    blocked_org = create(:org, circle: presentation.circle)
    create(:presentations_org, presentation: presentation, org: allowed_org, ask_cents: 10_000)
    create(:presentations_org, presentation: presentation, org: blocked_org, ask_cents: 10_000)
    membership = create(:membership, circle: presentation.circle)
    create(:presentations_membership, presentation: presentation, membership: membership)
    create(
      :presentation_interaction,
      presentation: presentation,
      interaction_ui_template: create(:interaction_ui_template, :finalist_vote),
      config: InteractionConfigFixtures::FINALIST_VOTE.merge(
        "settings" => { "default_votes" => 10 },
      ),
    )
    create(
      :presentation_interaction_response,
      presentation_interaction: presentation.interactions.first,
      membership: membership,
      response_data: {
        votes: [{ org_id: allowed_org.id, amount_cents: 5 }],
      },
    )
    pledges = create(
      :presentation_interaction,
      presentation: presentation,
      interaction_ui_template: create(:interaction_ui_template, :pledges),
      config: InteractionConfigFixtures::PLEDGES,
    )
    response = build_response(
      interaction: pledges,
      membership: membership,
      response_data: {
        pledges: [{ org_id: blocked_org.id, amount_cents: 100 }],
        anonymous: false,
      },
    )

    expect(response).not_to be_valid
    expect(response.errors[:response_data].join).to include("not an allowed organization")
  end

  it "rejects pledges that exceed the org ask when over-ask is disallowed" do
    presentation = create(:presentation)
    org = create(:org, circle: presentation.circle)
    create(:presentations_org, presentation: presentation, org: org, ask_cents: 500)
    membership = create(:membership, circle: presentation.circle)
    create(:presentations_membership, presentation: presentation, membership: membership)
    pledges = create(
      :presentation_interaction,
      presentation: presentation,
      interaction_ui_template: create(:interaction_ui_template, :pledges),
      config: InteractionConfigFixtures::PLEDGES.merge(
        "settings" => { "allow_non_finalists" => true, "allow_over_ask" => false },
      ),
    )
    response = build_response(
      interaction: pledges,
      membership: membership,
      response_data: {
        pledges: [{ org_id: org.id, amount_cents: 750 }],
        anonymous: false,
      },
    )

    expect(response).not_to be_valid
    expect(response.errors[:response_data].join).to include("exceed the organization ask")
  end

  it "accepts pledges that exceed the org ask when over-ask is allowed" do
    presentation = create(:presentation)
    org = create(:org, circle: presentation.circle)
    create(:presentations_org, presentation: presentation, org: org, ask_cents: 500)
    membership = create(:membership, circle: presentation.circle)
    create(:presentations_membership, presentation: presentation, membership: membership)
    pledges = create(
      :presentation_interaction,
      presentation: presentation,
      interaction_ui_template: create(:interaction_ui_template, :pledges),
      config: InteractionConfigFixtures::PLEDGES.merge(
        "settings" => { "allow_non_finalists" => true, "allow_over_ask" => true },
      ),
    )
    response = build_response(
      interaction: pledges,
      membership: membership,
      response_data: {
        pledges: [{ org_id: org.id, amount_cents: 750 }],
        anonymous: false,
      },
    )

    expect(response).to be_valid
  end

  it "rejects field groups above the maximum entry count" do
    interaction = create(
      :presentation_interaction,
      config: {
        "fields" => [
          {
            "key" => "group",
            "type" => "field_group",
            "label" => "Group",
            "options" => { "max" => 1 },
            "fields" => [
              { "key" => "note", "type" => "text", "label" => "Note" },
            ],
          },
        ],
        "outputs" => [],
      },
    )
    membership = setup_membership(interaction)
    response = build_response(
      interaction: interaction,
      membership: membership,
      response_data: {
        group: [{ note: "one" }, { note: "two" }],
      },
    )

    expect(response).not_to be_valid
    expect(response.errors[:response_data].join).to include("at most 1")
  end

  it "rejects non-numeric number values and values below the minimum" do
    interaction = create(
      :presentation_interaction,
      config: {
        "fields" => [
          { "key" => "count", "type" => "number", "label" => "Count", "options" => { "min" => 2, "max" => 9 } },
        ],
        "outputs" => [],
      },
    )
    membership = setup_membership(interaction)

    non_numeric = build_response(
      interaction: interaction,
      membership: membership,
      response_data: { count: "abc" },
    )
    expect(non_numeric).not_to be_valid
    expect(non_numeric.errors[:response_data].join).to include("must be a number")

    too_small = build_response(
      interaction: interaction,
      membership: membership,
      response_data: { count: 1 },
    )
    expect(too_small).not_to be_valid
    expect(too_small.errors[:response_data].join).to include("at least")
  end

  it "rejects invalid money amount and currency shapes" do
    interaction = create(
      :presentation_interaction,
      config: {
        "fields" => [
          { "key" => "gift", "type" => "money", "label" => "Gift" },
        ],
        "outputs" => [],
      },
    )
    membership = setup_membership(interaction)
    response = build_response(
      interaction: interaction,
      membership: membership,
      response_data: {
        gift: { amount_cents: "12.5", currency: 1 },
      },
    )

    expect(response).not_to be_valid
    messages = response.errors[:response_data].join(" ")
    expect(messages).to include("amount_cents")
    expect(messages).to include("currency")
  end

  it "rejects non-string select values and non-array multi-select values" do
    interaction = create(
      :presentation_interaction,
      config: {
        "fields" => [
          {
            "key" => "choice",
            "type" => "single_select",
            "label" => "Choice",
            "options" => { "choices" => %w[a b] },
          },
          {
            "key" => "tags",
            "type" => "multi_select",
            "label" => "Tags",
            "options" => { "choices" => %w[x y] },
          },
        ],
        "outputs" => [],
      },
    )
    membership = setup_membership(interaction)
    response = build_response(
      interaction: interaction,
      membership: membership,
      response_data: {
        choice: 1,
        tags: "x",
      },
    )

    expect(response).not_to be_valid
    messages = response.errors[:response_data].join(" ")
    expect(messages).to include("must be a string")
    expect(messages).to include("array of strings")
  end

  it "rejects malformed org money maps" do
    interaction = create(:presentation_interaction)
    membership = setup_membership(interaction)

    not_array = build_response(
      interaction: interaction,
      membership: membership,
      response_data: { allocations: "nope" },
    )
    expect(not_array).not_to be_valid
    expect(not_array.errors[:response_data].join).to include("must be an array")

    bad_entries = build_response(
      interaction: interaction,
      membership: membership,
      response_data: {
        allocations: [
          "nope",
          { amount_cents: 10 },
          { org_id: SecureRandom.uuid, amount_cents: "12.5" },
        ],
      },
    )
    expect(bad_entries).not_to be_valid
    messages = bad_entries.errors[:response_data].join(" ")
    expect(messages).to include("must be an object")
    expect(messages).to include("org_id")
  end

  it "rejects malformed ranked lists and field groups" do
    presentation = create(:presentation)
    membership = create(:membership, circle: presentation.circle)
    create(:presentations_membership, presentation: presentation, membership: membership)
    ranked = create(
      :presentation_interaction,
      presentation: presentation,
      config: {
        "fields" => [
          { "key" => "ranks", "type" => "org_ranked_list", "label" => "Ranks" },
        ],
        "outputs" => [],
      },
    )

    not_array = build_response(
      interaction: ranked,
      membership: membership,
      response_data: { ranks: "nope" },
    )
    expect(not_array).not_to be_valid
    expect(not_array.errors[:response_data].join).to include("must be an array")

    bad_entries = build_response(
      interaction: ranked,
      membership: membership,
      response_data: {
        ranks: ["nope", { rank: 1 }],
      },
    )
    expect(bad_entries).not_to be_valid
    messages = bad_entries.errors[:response_data].join(" ")
    expect(messages).to include("must be an object")
    expect(messages).to include("org_id")

    grouped = create(
      :presentation_interaction,
      presentation: presentation,
      config: {
        "fields" => [
          {
            "key" => "group",
            "type" => "field_group",
            "label" => "Group",
            "fields" => [
              { "key" => "note", "type" => "text", "label" => "Note" },
            ],
          },
        ],
        "outputs" => [],
      },
    )
    group_not_array = build_response(
      interaction: grouped,
      membership: membership,
      response_data: { group: "nope" },
    )
    expect(group_not_array).not_to be_valid
    expect(group_not_array.errors[:response_data].join).to include("must be an array")

    group_bad_entry = build_response(
      interaction: grouped,
      membership: membership,
      response_data: { group: ["nope"] },
    )
    expect(group_bad_entry).not_to be_valid
    expect(group_bad_entry.errors[:response_data].join).to include("must be an object")
  end
end
