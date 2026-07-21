class Presentation::Interaction::ContextLoader
  def self.load(presentation, config)
    new(presentation, config).load
  end

  def initialize(presentation, config)
    @presentation = presentation
    @config = config.with_indifferent_access
  end

  def load
    context = {}

    if references_orgs?(@config[:fields])
      context[:presentation_orgs] = @presentation.orgs.map { |org| org.render(:persisted) }
    end

    context[:choices] = collect_static_choices(@config[:fields])
    context
  end

  private

  def references_orgs?(fields)
    return false unless fields.is_a?(Array)

    fields.any? do |field|
      next false unless field.is_a?(Hash)

      field = field.with_indifferent_access

      if Presentation::Interaction::Registry.org_field?(field)
        true
      elsif Presentation::Interaction::Registry.field_group?(field)
        references_orgs?(field[:fields])
      else
        false
      end
    end
  end

  def collect_static_choices(fields, choices = {})
    return choices unless fields.is_a?(Array)

    fields.each do |field|
      next unless field.is_a?(Hash)

      field = field.with_indifferent_access
      if Presentation::Interaction::Registry.select_field?(field)
        field_choices = field.dig(:options, :choices)
        choices[field[:key]] = field_choices if field_choices.is_a?(Array)
      end

      if Presentation::Interaction::Registry.field_group?(field)
        collect_static_choices(field[:fields], choices)
      end
    end

    choices
  end
end
