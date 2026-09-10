class Interactions::Orchestration
  def self.from_config(config)
    new(config).to_h
  end

  def self.parse(config)
    new(config)
  end

  def initialize(config)
    @config = config.is_a?(Hash) ? config.with_indifferent_access : {}
    @orchestration = (@config[:orchestration] || {}).with_indifferent_access
  end

  def stage
    value = @orchestration[:stage]
    return 0 if value.blank?

    parsed = value.to_i
    parsed.negative? ? 0 : parsed
  end

  def output_metric
    metric = @orchestration[:output_metric]
    return metric if metric.present? && Interactions::Registry.known_metric?(metric)

    nil
  end

  def funding_basis
    basis = @orchestration[:funding_basis]
    return default_funding_basis unless basis.is_a?(Array)

    selected = basis.select { |metric| Interactions::Registry::FUNDING_METRICS.include?(metric) }
    selected.presence || default_funding_basis
  end

  def exclude_funded_orgs?
    @orchestration[:exclude_funded_orgs] == true
  end

  def to_h
    {
      stage: stage,
      output_metric: output_metric,
      funding_basis: funding_basis,
      exclude_funded_orgs: exclude_funded_orgs?,
    }.compact
  end

  private

  def default_funding_basis
    metric = output_metric
    return [metric] if metric.present? && Interactions::Registry::FUNDING_METRICS.include?(metric)

    ["allocated_totals"]
  end
end
