class Presentation::Settings
  FINALIST_COUNT_DEFAULT = 5
  FINALIST_COUNT_KEY = "finalist_count".freeze
  LEVERAGE_FUNDING_BASIS_KEY = "leverage_funding_basis".freeze
  DEFAULT_LEVERAGE_FUNDING_BASIS = %w[pledge_totals allocated_totals].freeze

  def initialize(presentation)
    @presentation = presentation
  end

  def finalist_count
    value = data[FINALIST_COUNT_KEY]
    parsed = value.to_i
    return FINALIST_COUNT_DEFAULT if parsed <= 0

    parsed
  end

  def finalist_count=(value)
    parsed = value.to_i
    @presentation.write_attribute(:settings, data.merge(FINALIST_COUNT_KEY => parsed))
  end

  def leverage_funding_basis
    raw = data[LEVERAGE_FUNDING_BASIS_KEY]
    return DEFAULT_LEVERAGE_FUNDING_BASIS unless raw.is_a?(Array)

    selected = raw.select { |metric| Interactions::Registry::FUNDING_METRICS.include?(metric) }
    selected.presence || DEFAULT_LEVERAGE_FUNDING_BASIS
  end

  def leverage_funding_basis=(value)
    basis = Array(value).select { |metric| Interactions::Registry::FUNDING_METRICS.include?(metric) }
    @presentation.write_attribute(
      :settings,
      data.merge(LEVERAGE_FUNDING_BASIS_KEY => basis.presence || DEFAULT_LEVERAGE_FUNDING_BASIS),
    )
  end

  private

  def data
    raw = @presentation.read_attribute(:settings)
    raw.is_a?(Hash) ? raw.stringify_keys : {}
  end
end
