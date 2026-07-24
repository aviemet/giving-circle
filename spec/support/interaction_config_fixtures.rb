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
    "settings" => {},
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
        "metric" => "org_vote_totals",
        "source_field" => "votes",
        "reducer" => "sum_by_org",
      },
    ],
    "settings" => {
      "finalist_count" => 5,
      "default_votes" => 10,
    },
  }.freeze

  PLEDGES = {
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
  }.freeze
end
