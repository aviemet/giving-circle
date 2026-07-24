class Presentation::Interaction::ContextLoader
  def self.load(interaction)
    new(interaction).load
  end

  def initialize(interaction)
    @interaction = interaction
    @presentation = interaction.presentation
    @config = interaction.config.with_indifferent_access
    @ui_slug = interaction.interaction_ui_template&.slug.to_s
  end

  def load
    context = {
      settings: (@config[:settings] || {}).with_indifferent_access,
      finalist_org_ids: finalist_org_ids,
    }

    if references_orgs?(@config[:fields])
      context[:presentation_orgs] = presentation_orgs_for_ui.map { |org|
        Presentations::Orgs::PersistedSerializer.render(org)
      }
    end

    context[:choices] = collect_static_choices(@config[:fields])
    context
  end

  private

  def settings
    (@config[:settings] || {}).with_indifferent_access
  end

  def finalist_org_ids
    snapshot = PresentationValues::Aggregator.call(@presentation)
    snapshot[:finalist_org_ids] || @presentation.orgs.map(&:id)
  end

  def presentation_orgs_for_ui
    orgs = @presentation.orgs.to_a
    case @ui_slug
    when "finalist_vote"
      orgs
    when "allocation"
      filter_to_finalists(orgs)
    when "pledges"
      if settings[:allow_non_finalists] == true
        orgs
      else
        filter_to_finalists(orgs)
      end
    else
      orgs
    end
  end

  def filter_to_finalists(orgs)
    ids = finalist_org_ids
    orgs.select { |org| ids.include?(org.id) }
  end

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
