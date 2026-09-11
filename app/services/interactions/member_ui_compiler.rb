class Interactions::MemberUiCompiler
  INPUT_COMPONENTS = {
    "InteractionTextInput" => {
      field_type: "text",
    },
    "InteractionNumberInput" => {
      field_type: "number",
    },
    "InteractionMoneyInput" => {
      field_type: "money",
      default_metric: "money_totals",
      default_reducer: "sum_money",
    },
    "InteractionBooleanInput" => {
      field_type: "boolean",
    },
    "InteractionSingleSelect" => {
      field_type: "single_select",
      default_metric: "vote_counts",
      default_reducer: "count_by_value",
    },
    "InteractionOrgReference" => {
      field_type: "org_reference",
      default_metric: "vote_counts",
      default_reducer: "count_by_value",
    },
    "InteractionOrgMoneyMap" => {
      field_type: "org_money_map",
      default_metric: "allocated_totals",
      default_reducer: "sum_by_org",
    },
    "InteractionOrgRankedList" => {
      field_type: "org_ranked_list",
      default_metric: "rank_totals",
      default_reducer: "rank_aggregate",
    },
  }.freeze

  LAYOUT_COMPONENTS = %w[
    MemberRoot
    MemberContainer
    MemberGrid
    MemberHeading
    MemberText
    Container
    Grid
    Heading
    Text
    Card
  ].freeze

  def self.compile(member_ui, existing_config: {})
    new(member_ui, existing_config: existing_config).compile
  end

  def initialize(member_ui, existing_config: {})
    @member_ui = member_ui.is_a?(Hash) ? member_ui.with_indifferent_access : {}
    @existing_config = existing_config.is_a?(Hash) ? existing_config.with_indifferent_access : {}
  end

  def compile
    fields = []
    outputs = []
    walk_nodes(Array(@member_ui[:content]), fields, outputs)

    root_props = (@member_ui.dig(:root, :props) || {}).with_indifferent_access
    settings = merge_settings(root_props)
    orchestration = merge_orchestration(root_props)

    {
      "fields" => fields,
      "outputs" => outputs,
      "settings" => settings,
      "orchestration" => orchestration,
    }
  end

  private

  def walk_nodes(nodes, fields, outputs)
    nodes.each do |node|
      next unless node.is_a?(Hash)

      node = node.with_indifferent_access
      type = node[:type]
      props = (node[:props] || {}).with_indifferent_access

      if INPUT_COMPONENTS.key?(type)
        compile_input(type, props, fields, outputs)
      end

      walk_slot(props[:content], fields, outputs) if props[:content].is_a?(Array)
      walk_nodes(Array(props[:content]), fields, outputs) if props[:content].is_a?(Array) && !slot_content?(props[:content])
    end
  end

  def walk_slot(content, fields, outputs)
    return unless content.is_a?(Array)

    content.each do |entry|
      next unless entry.is_a?(Hash)

      entry = entry.with_indifferent_access
      if entry[:type].present?
        walk_nodes([entry], fields, outputs)
      elsif entry[:props].is_a?(Hash)
        walk_nodes([entry], fields, outputs)
      end
    end
  end

  def slot_content?(content)
    content.all? { |entry| entry.is_a?(Hash) && entry[:type].present? }
  end

  def compile_input(type, props, fields, outputs)
    definition = INPUT_COMPONENTS.fetch(type)
    field_key = props[:fieldKey].to_s.strip
    return if field_key.blank?

    label = props[:label].presence || field_key.humanize
    field = {
      "key" => field_key,
      "type" => definition[:field_type],
      "label" => label,
    }

    if definition[:field_type] == "single_select" && props[:choices].is_a?(Array)
      field["options"] = { "choices" => props[:choices] }
    end

    fields << field

    metric = props[:outputMetric].presence || definition[:default_metric]
    reducer = props[:outputReducer].presence || definition[:default_reducer]
    return if metric.blank? || reducer.blank?

    outputs << {
      "metric" => metric,
      "source_field" => field_key,
      "reducer" => reducer,
    }
  end

  def merge_settings(root_props)
    existing = (@existing_config[:settings] || {}).with_indifferent_access
    compiled = {}
    default_votes = root_props[:default_votes].presence || root_props[:defaultVotes]
    compiled["default_votes"] = default_votes.to_i if default_votes.present?
    if root_props.key?(:allow_non_finalists) || root_props.key?(:allowNonFinalists)
      compiled["allow_non_finalists"] = root_props[:allow_non_finalists] == true || root_props[:allowNonFinalists] == true
    end
    if root_props.key?(:allow_over_ask) || root_props.key?(:allowOverAsk)
      compiled["allow_over_ask"] = root_props[:allow_over_ask] == true || root_props[:allowOverAsk] == true
    end
    existing.merge(compiled)
  end

  def merge_orchestration(root_props)
    existing = (@existing_config[:orchestration] || {}).with_indifferent_access
    compiled = {}
    compiled["stage"] = root_props[:stage].to_i if root_props[:stage].present?
    compiled["output_metric"] = root_props[:outputMetric] if root_props[:outputMetric].present?
    funding_basis = root_props[:fundingBasis]
    if funding_basis.is_a?(Array)
      compiled["funding_basis"] = funding_basis
    elsif funding_basis.present?
      compiled["funding_basis"] = [funding_basis]
    end
    if root_props.key?(:excludeFundedOrgs)
      compiled["exclude_funded_orgs"] = root_props[:excludeFundedOrgs] == true
    end
    existing.merge(compiled)
  end
end
