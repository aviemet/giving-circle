class Interactions::ContextLoader
  def self.load(interaction)
    new(interaction).load
  end

  def initialize(interaction)
    @interaction = interaction
    @presentation = interaction.presentation
    @config = interaction.config.with_indifferent_access
    @ui_slug = interaction.interaction_ui_template&.slug.to_s
    @orchestration = Interactions::Orchestration.parse(@config)
  end

  def load
    snapshot = composed_snapshot
    context = {
      settings: (@config[:settings] || {}).with_indifferent_access,
      finalist_org_ids: snapshot[:finalist_org_ids] || @presentation.orgs.map(&:id),
      funding_totals: snapshot[:funding_totals] || [],
      funded_org_ids: snapshot[:funded_org_ids] || [],
    }

    if references_orgs?(@config[:fields])
      context[:presentation_orgs] = presentation_orgs_for_ui(snapshot).map { |org|
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

  def composed_snapshot
    aggregator = PresentationValues::Aggregator.new(@presentation)
    PresentationValues::Composer.enrich(
      @presentation,
      aggregator.raw_snapshot,
      funding_basis: @orchestration.funding_basis,
    )
  end

  def presentation_orgs_for_ui(snapshot)
    orgs = @presentation.orgs.to_a
    orgs = filter_to_finalists(orgs, snapshot) if ui_slug_filters_finalists?
    orgs = orgs.reject { |org| funded_org_ids(snapshot).include?(org.id) } if @orchestration.exclude_funded_orgs?
    orgs
  end

  def funded_org_ids(snapshot)
    Array(snapshot[:funded_org_ids])
  end

  def ui_slug_filters_finalists?
    case @ui_slug
    when "finalist_vote"
      false
    when "allocation"
      true
    when "pledges"
      settings[:allow_non_finalists] != true
    else
      false
    end
  end

  def filter_to_finalists(orgs, snapshot)
    ids = snapshot[:finalist_org_ids] || @presentation.orgs.map(&:id)
    orgs.select { |org| ids.include?(org.id) }
  end

  def references_orgs?(fields)
    return false unless fields.is_a?(Array)

    fields.any? do |field|
      next false unless field.is_a?(Hash)

      field = field.with_indifferent_access

      if Interactions::Registry.org_field?(field)
        true
      elsif Interactions::Registry.field_group?(field)
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
      if Interactions::Registry.select_field?(field)
        field_choices = field.dig(:options, :choices)
        choices[field[:key]] = field_choices if field_choices.is_a?(Array)
      end

      if Interactions::Registry.field_group?(field)
        collect_static_choices(field[:fields], choices)
      end
    end

    choices
  end
end
