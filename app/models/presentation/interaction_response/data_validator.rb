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

  def ui_template_slug
    @interaction.interaction_ui_template&.slug.to_s
  end

  def settings
    (@interaction.config.with_indifferent_access[:settings] || {}).with_indifferent_access
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
    when "boolean"
      validate_boolean(value, prefix)
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

  def validate_boolean(value, prefix)
    return if [true, false].include?(value)
    return if ["true", "false"].include?(value)

    @errors << I18n.t("presentations.interaction_responses.validations.response_data.must_be_boolean", prefix: prefix)
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
      next if entry[:amount_cents].is_a?(Integer) || entry[:amount_cents].to_s.match?(/\A-?\d+\z/)

      @errors << I18n.t(
        "presentations.interaction_responses.validations.response_data.entry_amount_cents_integer",
        prefix: prefix,
        index: index,
      )
    end

    case ui_template_slug
    when "finalist_vote"
      validate_org_vote_map_budget(value, prefix)
    when "pledges"
      validate_pledges_map(value, prefix)
    else
      validate_org_money_map_budget(value, prefix)
    end
  end

  def validate_org_money_map_budget(value, prefix)
    membership = @response.membership
    presentation = @interaction&.presentation
    return if membership.blank? || presentation.blank?

    available = presentation.available_funds_for(membership)
    return if available.nil?

    total_cents = sum_amount_cents(value)
    return if total_cents <= available.cents

    @errors << I18n.t(
      "presentations.interaction_responses.validations.response_data.exceeds_available_funds",
      prefix: prefix,
      available_cents: available.cents,
    )
  end

  def validate_org_vote_map_budget(value, prefix)
    membership = @response.membership
    return if membership.blank? || @interaction.blank?

    available = @interaction.available_votes_for(membership)
    available_votes = available.nil? ? 0 : available.to_i
    total_votes = sum_amount_cents(value)
    return if total_votes <= available_votes

    @errors << I18n.t(
      "presentations.interaction_responses.validations.response_data.exceeds_available_votes",
      prefix: prefix,
      available_votes: available_votes,
    )
  end

  def validate_pledges_map(value, prefix)
    presentation = @interaction&.presentation
    return if presentation.blank?

    if value.empty? || sum_amount_cents(value) <= 0
      @errors << I18n.t("presentations.interaction_responses.validations.response_data.pledge_amount_required", prefix: prefix)
      return
    end

    allowed_org_ids = allowed_pledge_org_ids(presentation)
    value.each_with_index do |entry, index|
      next unless entry.is_a?(Hash)

      org_id = entry.with_indifferent_access[:org_id]
      next if org_id.blank?
      next if allowed_org_ids.include?(org_id)

      @errors << I18n.t(
        "presentations.interaction_responses.validations.response_data.org_not_allowed",
        prefix: prefix,
        index: index,
      )
    end

    return if settings[:allow_over_ask] == true

    allocated_by_org = current_allocated_cents_by_org(presentation)
    ask_by_org = presentation.orgs.index_by(&:id).transform_values { |org| org.ask_cents.to_i }

    value.each_with_index do |entry, index|
      next unless entry.is_a?(Hash)

      entry = entry.with_indifferent_access
      org_id = entry[:org_id]
      amount_cents = entry[:amount_cents].to_i
      next if org_id.blank?

      ask_cents = ask_by_org[org_id]
      next if ask_cents.nil? || ask_cents <= 0

      projected = allocated_by_org.fetch(org_id, 0) + amount_cents
      next if projected <= ask_cents

      @errors << I18n.t(
        "presentations.interaction_responses.validations.response_data.exceeds_org_ask",
        prefix: prefix,
        index: index,
      )
    end
  end

  def allowed_pledge_org_ids(presentation)
    snapshot = PresentationValues::Aggregator.call(presentation)
    finalist_ids = snapshot[:finalist_org_ids] || []
    return presentation.orgs.map(&:id) if settings[:allow_non_finalists] == true

    finalist_ids
  end

  def current_allocated_cents_by_org(presentation)
    snapshot = PresentationValues::Aggregator.call(presentation)
    (snapshot[:allocated_totals] || []).each_with_object({}) do |entry, totals|
      totals[entry[:org_id]] = entry[:allocated_cents].to_i
    end
  end

  def sum_amount_cents(value)
    value.sum do |entry|
      next 0 unless entry.is_a?(Hash)

      entry.with_indifferent_access[:amount_cents].to_i
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
      next if entry[:rank].is_a?(Integer) || entry[:rank].to_s.match?(/\A\d+\z/)

      @errors << I18n.t(
        "presentations.interaction_responses.validations.response_data.rank_integer",
        prefix: prefix,
        index: index,
      )
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
