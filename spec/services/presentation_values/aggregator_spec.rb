require "rails_helper"

RSpec.describe PresentationValues::Aggregator do
  def setup_presentation
    presentation = create(:presentation)
    org = create(:org, circle: presentation.circle)
    create(:presentations_org, presentation: presentation, org: org)
    membership = create(:membership, circle: presentation.circle)
    create(:presentations_membership, presentation: presentation, membership: membership)
    [presentation, org, membership]
  end

  it "returns zero allocated totals for orgs without responses" do
    presentation, org, _membership = setup_presentation
    create(:presentation_interaction, presentation: presentation)

    values = described_class.call(presentation)

    expect(values[:allocated_totals]).to contain_exactly(
      {
        org_id: org.id,
        allocated_cents: 0,
        currency: "USD",
      },
    )
  end

  it "returns empty allocated totals when presentation has no allocation outputs" do
    presentation, _org, _membership = setup_presentation
    create(
      :presentation_interaction,
      presentation: presentation,
      config: { "fields" => [], "outputs" => [] },
    )

    values = described_class.call(presentation.reload)

    expect(values[:allocated_totals]).to eq([])
  end

  it "sums allocation response amounts per org via config outputs" do
    presentation, org, membership = setup_presentation
    interaction = create(:presentation_interaction, presentation: presentation)
    create(
      :presentation_interaction_response,
      presentation_interaction: interaction,
      membership: membership,
      response_data: {
        allocations: [
          { org_id: org.id, amount_cents: 1_500 },
        ],
      },
    )

    values = described_class.call(presentation)

    expect(values[:allocated_totals]).to contain_exactly(
      {
        org_id: org.id,
        allocated_cents: 1_500,
        currency: "USD",
      },
    )
  end

  it "includes org_vote_totals and finalist_org_ids for finalist vote responses" do
    presentation, org, membership = setup_presentation
    finalist = create(
      :presentation_interaction,
      presentation: presentation,
      interaction_ui_template: create(:interaction_ui_template, :finalist_vote),
      config: InteractionConfigFixtures::FINALIST_VOTE,
    )
    finalist.sync_interaction_memberships!
    create(
      :presentation_interaction_response,
      presentation_interaction: finalist,
      membership: membership,
      response_data: {
        votes: [
          { org_id: org.id, amount_cents: 4 },
        ],
      },
    )

    values = described_class.call(presentation.reload)

    expect(values[:org_vote_totals]).to contain_exactly(
      { org_id: org.id, votes: 4 },
    )
    expect(values[:finalist_org_ids]).to eq([org.id])
    expect(values[:allocated_totals]).to eq([])
  end

  it "aggregates vote_counts from org_reference responses" do
    presentation, org, membership = setup_presentation
    interaction = create(
      :presentation_interaction,
      presentation: presentation,
      config: {
        "fields" => [
          { "key" => "pick", "type" => "org_reference", "label" => "Pick" },
        ],
        "outputs" => [
          {
            "metric" => "vote_counts",
            "source_field" => "pick",
            "reducer" => "count_by_value",
          },
        ],
      },
    )
    create(
      :presentation_interaction_response,
      presentation_interaction: interaction,
      membership: membership,
      response_data: { pick: org.id },
    )

    values = described_class.call(presentation.reload)

    expect(values[:vote_counts]).to contain_exactly(
      { value: org.id, count: 1 },
    )
  end

  it "aggregates money_totals from money field responses" do
    presentation, _org, membership = setup_presentation
    interaction = create(
      :presentation_interaction,
      presentation: presentation,
      config: {
        "fields" => [
          { "key" => "gift", "type" => "money", "label" => "Gift" },
        ],
        "outputs" => [
          {
            "metric" => "money_totals",
            "source_field" => "gift",
            "reducer" => "sum_money",
          },
        ],
      },
    )
    create(
      :presentation_interaction_response,
      presentation_interaction: interaction,
      membership: membership,
      response_data: {
        gift: { amount_cents: 2_500, currency: "USD" },
      },
    )

    values = described_class.call(presentation.reload)

    expect(values[:money_totals]).to contain_exactly(
      { total_cents: 2_500, currency: "USD" },
    )
  end

  it "aggregates rank_totals from org_ranked_list responses" do
    presentation, org, membership = setup_presentation
    interaction = create(
      :presentation_interaction,
      presentation: presentation,
      config: {
        "fields" => [
          { "key" => "ranks", "type" => "org_ranked_list", "label" => "Ranks" },
        ],
        "outputs" => [
          {
            "metric" => "rank_totals",
            "source_field" => "ranks",
            "reducer" => "rank_aggregate",
          },
        ],
      },
    )
    create(
      :presentation_interaction_response,
      presentation_interaction: interaction,
      membership: membership,
      response_data: {
        ranks: [{ org_id: org.id, rank: 2 }],
      },
    )

    values = described_class.call(presentation.reload)

    expect(values[:rank_totals]).to contain_exactly(
      { org_id: org.id, score: 2 },
    )
  end

  it "skips incomplete outputs and unknown reducers" do
    presentation, _org, _membership = setup_presentation
    interaction = create(
      :presentation_interaction,
      presentation: presentation,
      config: {
        "fields" => [
          { "key" => "note", "type" => "text", "label" => "Note" },
        ],
        "outputs" => [],
      },
    )
    interaction.update_column(
      :config,
      {
        "fields" => [
          { "key" => "note", "type" => "text", "label" => "Note" },
        ],
        "outputs" => [
          { "metric" => "vote_counts", "source_field" => "", "reducer" => "count_by_value" },
          { "metric" => "vote_counts", "source_field" => "note", "reducer" => "not_real" },
        ],
      },
    )

    values = described_class.call(presentation.reload)

    expect(values[:vote_counts]).to eq([])
    expect(values[:allocated_totals]).to eq([])
  end

  it "indexes nested field_group fields for outputs" do
    presentation, org, membership = setup_presentation
    interaction = create(
      :presentation_interaction,
      presentation: presentation,
      config: {
        "fields" => [
          {
            "key" => "group",
            "type" => "field_group",
            "label" => "Group",
            "fields" => [
              { "key" => "allocations", "type" => "org_money_map", "label" => "Allocate" },
            ],
          },
        ],
        "outputs" => [
          {
            "metric" => "allocated_totals",
            "source_field" => "allocations",
            "reducer" => "sum_by_org",
          },
        ],
      },
    )
    response_record = build(
      :presentation_interaction_response,
      presentation_interaction: interaction,
      membership: membership,
      response_data: {},
    )
    response_record.save!(validate: false)
    response_record.update_column(
      :response_data,
      {
        "allocations" => [
          { "org_id" => org.id, "amount_cents" => 500 },
        ],
      },
    )

    values = described_class.call(presentation.reload)

    expect(values[:allocated_totals]).to include(
      hash_including(org_id: org.id, allocated_cents: 500),
    )
  end
end
