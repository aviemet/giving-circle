module InteractionConfigTemplateDefaults
  DEFINITIONS = [
    {
      name: "Allocation round",
      slug: "allocation-round",
      ui_template_slug: "allocation",
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
        "settings" => {},
      },
    },
    {
      name: "Org vote",
      slug: "org-vote",
      ui_template_slug: "org_vote",
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
        "settings" => {},
      },
    },
    {
      name: "Finalist vote",
      slug: "finalist-vote",
      ui_template_slug: "finalist_vote",
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
            "metric" => "org_vote_totals",
            "source_field" => "votes",
            "reducer" => "sum_by_org",
          },
        ],
        "settings" => {
          "finalist_count" => 5,
          "default_votes" => 10,
        },
      },
    },
    {
      name: "Pledges",
      slug: "pledges",
      ui_template_slug: "pledges",
      config: {
        "fields" => [
          {
            "key" => "pledges",
            "type" => "org_money_map",
            "label" => "Pledge to organizations",
          },
          {
            "key" => "anonymous",
            "type" => "boolean",
            "label" => "Anonymous",
          },
        ],
        "outputs" => [
          {
            "metric" => "allocated_totals",
            "source_field" => "pledges",
            "reducer" => "sum_by_org",
          },
        ],
        "settings" => {
          "allow_non_finalists" => false,
          "allow_over_ask" => false,
        },
      },
    },
  ].freeze

  def self.seed_for_circle!(circle)
    InteractionUiTemplateDefaults.seed!

    DEFINITIONS.each do |definition|
      ui_template = InteractionUiTemplate.find_by!(slug: definition[:ui_template_slug])
      circle.interaction_config_templates.find_or_create_by!(slug: definition[:slug]) do |template|
        template.name = definition[:name]
        template.config = definition[:config]
        template.interaction_ui_template = ui_template
      end
    end
  end
end
