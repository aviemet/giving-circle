module Interactions::MemberUiPresets
  DEFAULT_ROOT_SURFACE = {
    "background" => {
      "color" => "#ffffff",
      "image" => {
        "url" => "",
        "size" => "cover",
        "customSize" => "100% 100%",
        "offsetX" => "center",
        "offsetY" => "center",
        "repeat" => "no-repeat",
        "attachment" => "scroll",
      },
    },
    "spacing" => {
      "margin" => { "top" => 0, "right" => 0, "bottom" => 0, "left" => 0, "unit" => "px" },
      "padding" => { "top" => 16, "right" => 16, "bottom" => 16, "left" => 16, "unit" => "px" },
    },
    "flex" => {
      "display" => "flex",
      "flexDirection" => "column",
      "flexWrap" => "nowrap",
      "alignItems" => "stretch",
      "justifyContent" => "flex-start",
      "overflow" => "hidden",
      "gap" => 16,
    },
  }.freeze

  ALLOCATION = {
    "content" => [
      {
        "type" => "InteractionOrgMoneyMap",
        "props" => {
          "id" => "interaction-allocations",
          "fieldKey" => "allocations",
          "label" => "Allocate to organizations",
          "outputMetric" => "allocated_totals",
          "widget" => "cards",
        },
      },
    ],
    "root" => {
      "props" => DEFAULT_ROOT_SURFACE.merge(
        "title" => "Allocation",
        "stage" => 2,
        "outputMetric" => "allocated_totals",
        "fundingBasis" => ["allocated_totals"],
        "excludeFundedOrgs" => false,
      ),
    },
  }.freeze

  FINALIST_VOTE = {
    "content" => [
      {
        "type" => "InteractionOrgMoneyMap",
        "props" => {
          "id" => "interaction-votes",
          "fieldKey" => "votes",
          "label" => "Cast your votes for organizations",
          "outputMetric" => "org_vote_totals",
          "widget" => "cards",
        },
      },
    ],
    "root" => {
      "props" => DEFAULT_ROOT_SURFACE.merge(
        "title" => "Finalist vote",
        "stage" => 1,
        "outputMetric" => "org_vote_totals",
        "defaultVotes" => 10,
      ),
    },
  }.freeze

  PLEDGES = {
    "content" => [
      {
        "type" => "InteractionOrgMoneyMap",
        "props" => {
          "id" => "interaction-pledges",
          "fieldKey" => "pledges",
          "label" => "Pledge to organizations",
          "outputMetric" => "pledge_totals",
          "widget" => "cards",
        },
      },
      {
        "type" => "InteractionBooleanInput",
        "props" => {
          "id" => "interaction-anonymous",
          "fieldKey" => "anonymous",
          "label" => "Anonymous",
        },
      },
    ],
    "root" => {
      "props" => DEFAULT_ROOT_SURFACE.merge(
        "title" => "Pledges",
        "stage" => 3,
        "outputMetric" => "pledge_totals",
        "fundingBasis" => ["pledge_totals", "allocated_totals"],
        "excludeFundedOrgs" => true,
        "allowNonFinalists" => false,
        "allowOverAsk" => false,
      ),
    },
  }.freeze

  ORG_VOTE = {
    "content" => [
      {
        "type" => "InteractionOrgReference",
        "props" => {
          "id" => "interaction-preferred-org",
          "fieldKey" => "preferred_org",
          "label" => "Which organization do you support?",
          "outputMetric" => "vote_counts",
        },
      },
    ],
    "root" => {
      "props" => DEFAULT_ROOT_SURFACE.merge(
        "title" => "Organization vote",
        "stage" => 1,
      ),
    },
  }.freeze
end
