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
end
