module InteractionConfigFixtures
  ALLOCATION_ROUND = {
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
  }.freeze

  FINALIST_VOTE = {
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
  }.freeze
end
