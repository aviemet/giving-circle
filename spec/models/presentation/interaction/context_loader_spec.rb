require "rails_helper"

RSpec.describe Presentation::Interaction::ContextLoader do
  let(:presentation) { create(:presentation) }

  it "loads presentation orgs when config includes org fields" do
    org = create(:org, circle: presentation.circle)
    create(:presentations_org, presentation: presentation, org: org)

    context = described_class.load(
      presentation,
      InteractionConfigFixtures::ALLOCATION_ROUND,
    )

    expect(context[:presentation_orgs]).to contain_exactly(org.render(:persisted))
    expect(context).not_to have_key(:theme_orgs)
  end

  it "omits presentation orgs when config has no org fields" do
    context = described_class.load(presentation, Presentation::Interaction::BLANK_CONFIG)

    expect(context).not_to have_key(:presentation_orgs)
  end
end
