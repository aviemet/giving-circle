require "rails_helper"

RSpec.describe Presentation::Interaction::ContextLoader do
  let(:presentation) { create(:presentation) }

  it "loads presentation orgs when config includes org fields" do
    org = create(:org, circle: presentation.circle)
    create(:presentations_org, presentation: presentation, org: org)
    interaction = create(
      :presentation_interaction,
      presentation: presentation,
      config: InteractionConfigFixtures::ALLOCATION_ROUND,
    )

    context = described_class.load(interaction)
    presentation_org = presentation.orgs.find(org.id)

    expect(context[:presentation_orgs]).to contain_exactly(
      Presentations::Orgs::PersistedSerializer.render(presentation_org),
    )
    expect(context[:finalist_org_ids]).to contain_exactly(org.id)
    expect(context).not_to have_key(:theme_orgs)
  end

  it "omits presentation orgs when config has no org fields" do
    interaction = create(
      :presentation_interaction,
      presentation: presentation,
      config: Presentation::Interaction::BLANK_CONFIG,
    )

    context = described_class.load(interaction)

    expect(context).not_to have_key(:presentation_orgs)
  end

  it "filters pledges orgs by finalists unless allow_non_finalists" do
    org = create(:org, circle: presentation.circle)
    other = create(:org, circle: presentation.circle)
    create(:presentations_org, presentation: presentation, org: org)
    create(:presentations_org, presentation: presentation, org: other)
    allow(PresentationValues::Aggregator).to receive(:call).and_return({ finalist_org_ids: [org.id] })

    restricted = create(
      :presentation_interaction,
      presentation: presentation,
      interaction_ui_template: create(:interaction_ui_template, :pledges),
      config: InteractionConfigFixtures::PLEDGES.merge(
        "settings" => { "allow_non_finalists" => false },
      ),
    )
    open_pledges = create(
      :presentation_interaction,
      presentation: presentation,
      interaction_ui_template: create(:interaction_ui_template, :pledges),
      config: InteractionConfigFixtures::PLEDGES.merge(
        "settings" => { "allow_non_finalists" => true },
      ),
    )

    restricted_ids = described_class.load(restricted)[:presentation_orgs].map { |row| row[:id] || row["id"] }
    open_ids = described_class.load(open_pledges)[:presentation_orgs].map { |row| row[:id] || row["id"] }

    expect(restricted_ids).to contain_exactly(org.id)
    expect(open_ids).to include(org.id, other.id)
  end

  it "walks nested field groups for org references and static choices" do
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
              {
                "key" => "choice",
                "type" => "single_select",
                "label" => "Choice",
                "options" => { "choices" => ["a", "b"] },
              },
              {
                "key" => "allocations",
                "type" => "org_money_map",
                "label" => "Allocate",
              },
            ],
          },
        ],
        "outputs" => [],
        "settings" => {},
      },
    )

    context = described_class.load(interaction)

    expect(context).to have_key(:presentation_orgs)
    expect(context[:choices]["choice"] || context[:choices][:choice]).to eq(["a", "b"])
  end

  it "returns all orgs for unknown ui templates" do
    org = create(:org, circle: presentation.circle)
    create(:presentations_org, presentation: presentation, org: org)
    interaction = create(
      :presentation_interaction,
      presentation: presentation,
      interaction_ui_template: create(:interaction_ui_template, slug: "custom-ui", name: "Custom"),
      config: InteractionConfigFixtures::ALLOCATION_ROUND,
    )

    ids = described_class.load(interaction)[:presentation_orgs].map { |row| row[:id] || row["id"] }

    expect(ids).to include(org.id)
  end
end
