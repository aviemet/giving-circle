require "rails_helper"

RSpec.describe Interactions::MemberUiCompiler do
  describe ".compile" do
    it "compiles allocation member_ui into fields, outputs, settings, and orchestration" do
      result = described_class.compile(Interactions::MemberUiPresets::ALLOCATION)

      expect(result["fields"]).to eq([
        {
          "key" => "allocations",
          "type" => "org_money_map",
          "label" => "Allocate to organizations",
        },
      ])
      expect(result["outputs"]).to eq([
        {
          "metric" => "allocated_totals",
          "source_field" => "allocations",
          "reducer" => "sum_by_org",
        },
      ])
      expect(result["orchestration"]).to include(
        "stage" => 2,
        "output_metric" => "allocated_totals",
        "funding_basis" => ["allocated_totals"],
        "exclude_funded_orgs" => false,
      )
    end

    it "compiles pledges with pledge_totals metric and funding basis" do
      result = described_class.compile(Interactions::MemberUiPresets::PLEDGES)

      expect(result["outputs"]).to include(
        {
          "metric" => "pledge_totals",
          "source_field" => "pledges",
          "reducer" => "sum_by_org",
        },
      )
      expect(result["orchestration"]).to include(
        "output_metric" => "pledge_totals",
        "funding_basis" => ["pledge_totals", "allocated_totals"],
        "exclude_funded_orgs" => true,
      )
      expect(result["settings"]).to include(
        "allow_non_finalists" => false,
        "allow_over_ask" => false,
      )
    end

    it "merges with existing config orchestration and settings" do
      result = described_class.compile(
        Interactions::MemberUiPresets::FINALIST_VOTE,
        existing_config: {
          "orchestration" => { "stage" => 99 },
          "settings" => { "default_votes" => 5 },
        },
      )

      expect(result["orchestration"]["stage"]).to eq(1)
      expect(result["settings"]["default_votes"]).to eq(10)
    end
  end
end
