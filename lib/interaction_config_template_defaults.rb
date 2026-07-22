module InteractionConfigTemplateDefaults
  DEFINITIONS = [
    {
      name: "Allocation round",
      slug: "allocation-round",
      config: {
        "fields" => [
          {
            "key" => "allocations",
            "type" => "org_money_map",
            "label" => "Allocate to organizations",
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
    },
    {
      name: "Org vote",
      slug: "org-vote",
      config: {
        "fields" => [
          {
            "key" => "preferred_org",
            "type" => "org_reference",
            "label" => "Which organization do you support?",
          },
        ],
        "outputs" => [
          {
            "metric" => "vote_counts",
            "source_field" => "preferred_org",
            "reducer" => "count_by_value",
          },
        ],
      },
    },
    {
      name: "Finalist vote",
      slug: "finalist-vote",
      config: {
        "fields" => [
          {
            "key" => "votes",
            "type" => "org_money_map",
            "label" => "Cast your votes for organizations",
          },
        ],
        "outputs" => [
          {
            "metric" => "allocated_totals",
            "source_field" => "votes",
            "reducer" => "sum_by_org",
          },
        ],
      },
    },
  ].freeze

  def self.seed_for_circle!(circle)
    DEFINITIONS.each do |definition|
      circle.interaction_config_templates.find_or_create_by!(slug: definition[:slug]) do |template|
        template.name = definition[:name]
        template.config = definition[:config]
      end
    end
  end
end
