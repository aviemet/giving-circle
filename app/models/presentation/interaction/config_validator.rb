class Presentation::Interaction::ConfigValidator
  KEY_FORMAT = /\A[a-z][a-z0-9_]*\z/
  I18N_SCOPE = "presentations.interactions.validations.config".freeze

  def self.validate(interaction)
    new(interaction).validate
  end

  def initialize(interaction)
    @interaction = interaction
    @errors = []
    @field_keys = Set.new
  end

  def validate
    config = @interaction.config
    if config.blank?
      @interaction.errors.add(:config, :blank)
      return
    end

    config = config.with_indifferent_access
    validate_fields(config[:fields], prefix: "config.fields")
    validate_outputs(config[:outputs], config[:fields])

    @errors.each { |message| @interaction.errors.add(:config, message) }
  end

  private

  def t(key, **)
    I18n.t("#{I18N_SCOPE}.#{key}", **)
  end

  def validate_fields(fields, prefix:)
    unless fields.is_a?(Array)
      @errors << t(:must_be_array, path: prefix)
      return
    end

    fields.each_with_index do |field, index|
      validate_field(field, "#{prefix}[#{index}]")
    end
  end

  def validate_field(field, path)
    unless field.is_a?(Hash)
      @errors << t(:must_be_object, path: path)
      return
    end

    field = field.with_indifferent_access
    key = field[:key]
    type = field[:type]
    label = field[:label]
    options = field[:options] || {}

    if key.blank?
      @errors << t(:key_required, path: path)
    elsif !KEY_FORMAT.match?(key)
      @errors << t(:key_format, path: path)
    elsif @field_keys.include?(key)
      @errors << t(:key_unique, path: path, key: key)
    else
      @field_keys << key
    end

    if label.blank?
      @errors << t(:label_required, path: path)
    end

    unless Presentation::Interaction::Registry.known_type?(type)
      @errors << t(:unknown_type, path: path, type: type)
      return
    end

    validate_field_options(field, path, options)

    if Presentation::Interaction::Registry.field_group?(field)
      nested_fields = field[:fields]
      if nested_fields.blank? || !nested_fields.is_a?(Array)
        @errors << t(:field_group_fields, path: path)
      else
        validate_fields(nested_fields, prefix: "#{path}.fields")
      end
    end
  end

  def validate_field_options(field, path, options)
    options = options.with_indifferent_access
    type = field.with_indifferent_access[:type]

    case type
    when "number"
      validate_numeric_bounds(options, path)
    when "single_select", "multi_select"
      validate_select_options(options, path)
    when "field_group"
      validate_group_options(options, path)
    end
  end

  def validate_numeric_bounds(options, path)
    min = options[:min]
    max = options[:max]
    return if min.blank? && max.blank?

    if min.present? && !min.is_a?(Numeric)
      @errors << t(:min_must_be_number, path: path)
    end
    if max.present? && !max.is_a?(Numeric)
      @errors << t(:max_must_be_number, path: path)
    end
    if min.is_a?(Numeric) && max.is_a?(Numeric) && min > max
      @errors << t(:min_lte_max, path: path)
    end
  end

  def validate_select_options(options, path)
    choices = options[:choices]

    if choices.blank?
      @errors << t(:choices_required, path: path)
      return
    end

    if !(choices.is_a?(Array) && choices.all? { |choice| choice.is_a?(String) && choice.present? })
      @errors << t(:choices_format, path: path)
    end
  end

  def validate_group_options(options, path)
    if options.key?(:repeatable) && [true, false].exclude(options[:repeatable])
      @errors << t(:repeatable_boolean, path: path)
    end

    min = options[:min]
    max = options[:max]
    if min.present? && !min.is_a?(Integer)
      @errors << t(:min_must_be_integer, path: path)
    end
    if max.present? && !max.is_a?(Integer)
      @errors << t(:max_must_be_integer, path: path)
    end
  end

  def validate_outputs(outputs, fields)
    unless outputs.is_a?(Array)
      @errors << t(:must_be_array, path: "config.outputs")
      return
    end

    field_index = index_fields(fields)

    outputs.each_with_index do |output, index|
      validate_output(output, "config.outputs[#{index}]", field_index)
    end
  end

  def index_fields(fields, index = {})
    return index unless fields.is_a?(Array)

    fields.each do |field|
      next unless field.is_a?(Hash)

      field = field.with_indifferent_access
      index[field[:key]] = field if field[:key].present?

      if Presentation::Interaction::Registry.field_group?(field)
        index_fields(field[:fields], index)
      end
    end

    index
  end

  def validate_output(output, path, field_index)
    unless output.is_a?(Hash)
      @errors << t(:must_be_object, path: path)
      return
    end

    output = output.with_indifferent_access
    metric = output[:metric]
    source_field = output[:source_field]
    reducer = output[:reducer]

    if metric.blank?
      @errors << t(:metric_required, path: path)
    elsif !Presentation::Interaction::Registry.known_metric?(metric)
      @errors << t(:unknown_metric, path: path, metric: metric)
    end

    if source_field.blank?
      @errors << t(:source_field_required, path: path)
      return
    end

    field = field_index[source_field]
    unless field
      @errors << t(:source_field_missing, path: path, source_field: source_field)
      return
    end

    field_type = field.with_indifferent_access[:type]

    if reducer.blank?
      @errors << t(:reducer_required, path: path)
    elsif !Presentation::Interaction::Registry.known_reducer?(reducer)
      @errors << t(:unknown_reducer, path: path, reducer: reducer)
    elsif !Presentation::Interaction::Registry.reducer_compatible_with_field?(reducer, field_type)
      @errors << t(:reducer_incompatible, path: path, reducer: reducer, field_type: field_type)
    end
  end
end
