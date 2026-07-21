module Presentation::Interaction::Registry
  FIELD_TYPES = %w[
    text
    number
    money
    single_select
    multi_select
    org_reference
    org_money_map
    org_ranked_list
    field_group
  ].freeze

  ORG_FIELD_TYPES = %w[org_reference org_money_map org_ranked_list].freeze
  SELECT_FIELD_TYPES = %w[single_select multi_select].freeze

  METRICS = %w[
    allocated_totals
    vote_counts
    money_totals
    rank_totals
  ].freeze

  REDUCERS = %w[
    sum_by_org
    count_by_value
    sum_money
    rank_aggregate
  ].freeze

  REDUCER_FIELD_TYPES = {
    "sum_by_org" => ["org_money_map"],
    "count_by_value" => ["org_reference", "single_select"],
    "sum_money" => ["money"],
    "rank_aggregate" => ["org_ranked_list"],
  }.freeze

  def self.known_type?(type)
    FIELD_TYPES.include?(type)
  end

  def self.known_metric?(metric)
    METRICS.include?(metric)
  end

  def self.known_reducer?(reducer)
    REDUCERS.include?(reducer)
  end

  def self.reducer_compatible_with_field?(reducer, field_type)
    REDUCER_FIELD_TYPES.fetch(reducer, []).include?(field_type)
  end

  def self.org_field?(field)
    ORG_FIELD_TYPES.include?(field.with_indifferent_access[:type])
  end

  def self.select_field?(field)
    SELECT_FIELD_TYPES.include?(field.with_indifferent_access[:type])
  end

  def self.field_group?(field)
    field.with_indifferent_access[:type] == "field_group"
  end
end
