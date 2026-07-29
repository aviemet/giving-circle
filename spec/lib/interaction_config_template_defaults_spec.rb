require "rails_helper"

RSpec.describe InteractionConfigTemplateDefaults do
  describe ".seed_for_circle!" do
    it "creates curated interaction config templates for the circle" do
      circle = create(:circle)

      expect {
        described_class.seed_for_circle!(circle)
      }.to change { circle.interaction_config_templates.count }.by(4)

      allocation = circle.interaction_config_templates.find_by!(slug: "allocation-round")
      expect(allocation.name).to eq("Allocation round")
      expect(allocation.interaction_ui_template.slug).to eq("allocation")
      expect(allocation.config.dig("fields", 0, "key")).to eq("allocations")

      org_vote = circle.interaction_config_templates.find_by!(slug: "org-vote")
      expect(org_vote.name).to eq("Org vote")
      expect(org_vote.interaction_ui_template.slug).to eq("org_vote")

      finalist_vote = circle.interaction_config_templates.find_by!(slug: "finalist-vote")
      expect(finalist_vote.name).to eq("Finalist vote")
      expect(finalist_vote.config.dig("settings", "finalist_count")).to eq(5)

      pledges = circle.interaction_config_templates.find_by!(slug: "pledges")
      expect(pledges.name).to eq("Pledges")
      expect(pledges.interaction_ui_template.slug).to eq("pledges")
    end

    it "is idempotent for an already seeded circle" do
      circle = create(:circle)
      described_class.seed_for_circle!(circle)

      expect {
        described_class.seed_for_circle!(circle)
      }.not_to change { circle.interaction_config_templates.count }
    end
  end
end
