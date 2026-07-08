class Circle::Settings
  PRIMARY_COLOR_DEFAULT = "blue".freeze
  PRIMARY_COLOR_KEY = "primary_color".freeze

  def initialize(circle)
    @circle = circle
  end

  def primary_color
    data[PRIMARY_COLOR_KEY].presence || PRIMARY_COLOR_DEFAULT
  end

  def primary_color=(value)
    @circle.write_attribute(:settings, data.merge(PRIMARY_COLOR_KEY => value))
  end

  private

  def data
    raw = @circle.read_attribute(:settings)
    raw.is_a?(Hash) ? raw.stringify_keys : {}
  end
end
