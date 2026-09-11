require "rails_helper"

RSpec.describe InteractionMemberUiConfig do
  it "compiles config from member_ui before validation" do
    template = InteractionConfigTemplate.new(
      name: "Test",
      slug: "test",
      circle: create(:circle),
      interaction_ui_template: create(:interaction_ui_template),
      member_ui: Interactions::MemberUiPresets::ALLOCATION,
    )

    expect(template).to be_valid
    expect(template.config["fields"].first["key"]).to eq("allocations")
    expect(template.config["outputs"].first["metric"]).to eq("allocated_totals")
  end
end
