class Presentation::InteractionResponse::DataValidator
  def self.validate(response)
    new(response).validate
  end

  def initialize(response)
    @response = response
    @interaction = response.presentation_interaction
    @errors = []
  end

  def validate
    return unless @interaction

    config = @interaction.config.with_indifferent_access
    fields = config[:fields]
    data = (@response.response_data || {}).with_indifferent_access

    unless fields.is_a?(Array)
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.fields_must_be_array")
      add_errors
      return
    end

    fields.each do |field|
      validate_field_value(field, data[field.with_indifferent_access[:key]], prefix: field.with_indifferent_access[:key])
    end

    data.each_key do |key|
      next if fields.any? { |field| field.with_indifferent_access[:key] == key }

      @errors << I18n.t("presentations.interaction_responses.validations.response_data.unknown_field", key: key)
    end

    add_errors
  end

  private

  def add_errors
    @errors.each { |message| @response.errors.add(:response_data, message) }
  end

  def validate_field_value(field, value, prefix:, required: true)
    field = field.with_indifferent_access
    type = field[:type]
    options = (field[:options] || {}).with_indifferent_access

    if value.nil? || (value.is_a?(String) && value.blank?)
      if required
        @errors << I18n.t("presentations.interaction_responses.validations.response_data.required", prefix: prefix)
      end
      return
    end

    case type
    when "text"
      validate_text(value, prefix)
    when "number"
      validate_number(value, prefix, options)
    when "money"
      validate_money(value, prefix)
    when "single_select"
      validate_single_select(value, prefix, options)
    when "multi_select"
      validate_multi_select(value, prefix, options)
    when "org_reference"
      validate_org_reference(value, prefix)
    when "org_money_map"
      validate_org_money_map(value, prefix)
    when "org_ranked_list"
      validate_org_ranked_list(value, prefix)
    when "field_group"
      validate_field_group(field, value, prefix, options)
    else
      @errors << I18n.t(
        "presentations.interaction_responses.validations.response_data.unknown_type",
        prefix: prefix,
        type: type,
      )
    end
  end

  def validate_text(value, prefix)
    unless value.is_a?(String)
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.must_be_string", prefix: prefix)
    end
  end

  def validate_number(value, prefix, options)
    unless value.is_a?(Numeric) || (value.is_a?(String) && value.match?(/\A-?\d+(\.\d+)?\z/))
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.must_be_number", prefix: prefix)
      return
    end

    numeric = value.to_f
    min = options[:min]
    max = options[:max]
    if min.is_a?(Numeric) && numeric < min
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.at_least", prefix: prefix, min: min)
    end
    if max.is_a?(Numeric) && numeric > max
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.at_most", prefix: prefix, max: max)
    end
  end

  def validate_money(value, prefix)
    unless value.is_a?(Hash)
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.must_be_money", prefix: prefix)
      return
    end

    value = value.with_indifferent_access
    unless value[:amount_cents].is_a?(Integer) || value[:amount_cents].to_s.match?(/\A-?\d+\z/)
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.amount_cents_integer", prefix: prefix)
    end

    if value[:currency].present? && !value[:currency].is_a?(String)
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.currency_string", prefix: prefix)
    end
  end

  def validate_single_select(value, prefix, options)
    unless value.is_a?(String)
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.must_be_string", prefix: prefix)
      return
    end

    choices = options[:choices]
    if choices.is_a?(Array) && !choices.include?(value)
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.must_be_choice", prefix: prefix)
    end
  end

  def validate_multi_select(value, prefix, options)
    unless value.is_a?(Array) && value.all?(String)
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.must_be_string_array", prefix: prefix)
      return
    end

    choices = options[:choices]
    if choices.is_a?(Array)
      invalid = value - choices
      if invalid.any?
        @errors << I18n.t("presentations.interaction_responses.validations.response_data.invalid_choices", prefix: prefix)
      end
    end
  end

  def validate_org_reference(value, prefix)
    unless value.is_a?(String) && value.present?
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.must_be_org_id", prefix: prefix)
    end
  end

  def validate_org_money_map(value, prefix)
    unless value.is_a?(Array)
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.must_be_array", prefix: prefix)
      return
    end

    value.each_with_index do |entry, index|
      unless entry.is_a?(Hash)
        @errors << I18n.t(
          "presentations.interaction_responses.validations.response_data.must_be_object",
          prefix: prefix,
          index: index,
        )
        next
      end

      entry = entry.with_indifferent_access
      if entry[:org_id].blank?
        @errors << I18n.t(
          "presentations.interaction_responses.validations.response_data.org_id_required",
          prefix: prefix,
          index: index,
        )
      end
      unless entry[:amount_cents].is_a?(Integer) || entry[:amount_cents].to_s.match?(/\A-?\d+\z/)
        @errors << I18n.t(
          "presentations.interaction_responses.validations.response_data.entry_amount_cents_integer",
          prefix: prefix,
          index: index,
        )
      end
    end
  end

  def validate_org_ranked_list(value, prefix)
    unless value.is_a?(Array)
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.must_be_array", prefix: prefix)
      return
    end

    value.each_with_index do |entry, index|
      unless entry.is_a?(Hash)
        @errors << I18n.t(
          "presentations.interaction_responses.validations.response_data.must_be_object",
          prefix: prefix,
          index: index,
        )
        next
      end

      entry = entry.with_indifferent_access
      if entry[:org_id].blank?
        @errors << I18n.t(
          "presentations.interaction_responses.validations.response_data.org_id_required",
          prefix: prefix,
          index: index,
        )
      end
      unless entry[:rank].is_a?(Integer) || entry[:rank].to_s.match?(/\A\d+\z/)
        @errors << I18n.t(
          "presentations.interaction_responses.validations.response_data.rank_integer",
          prefix: prefix,
          index: index,
        )
      end
    end
  end

  def validate_field_group(field, value, prefix, options)
    unless value.is_a?(Array)
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.must_be_array", prefix: prefix)
      return
    end

    min = options[:min]
    max = options[:max]
    if min.is_a?(Integer) && value.length < min
      @errors << I18n.t(
        "presentations.interaction_responses.validations.response_data.min_entries",
        prefix: prefix,
        min: min,
      )
    end
    if max.is_a?(Integer) && value.length > max
      @errors << I18n.t(
        "presentations.interaction_responses.validations.response_data.max_entries",
        prefix: prefix,
        max: max,
      )
    end

    nested_fields = field[:fields]
    return unless nested_fields.is_a?(Array)

    value.each_with_index do |group_value, group_index|
      unless group_value.is_a?(Hash)
        @errors << I18n.t(
          "presentations.interaction_responses.validations.response_data.group_must_be_object",
          prefix: prefix,
          group_index: group_index,
        )
        next
      end

      group_value = group_value.with_indifferent_access
      nested_fields.each do |nested_field|
        nested_key = nested_field.with_indifferent_access[:key]
        validate_field_value(
          nested_field,
          group_value[nested_key],
          prefix: "#{prefix}[#{group_index}].#{nested_key}",
        )
      end
    end
  end
end
