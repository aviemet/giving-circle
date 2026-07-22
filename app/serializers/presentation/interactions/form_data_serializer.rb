class Presentation::Interactions::FormDataSerializer < Presentation::InteractionSerializer
  has_many :slides, serializer: Slides::PersistedSerializer do
    @object.presentation&.slides || Slide.none
  end

  attribute :field_types, type: "string[]" do
    Presentation::Interaction::Registry::FIELD_TYPES
  end

  attribute :metrics, type: "string[]" do
    Presentation::Interaction::Registry::METRICS
  end

  attribute :reducers, type: "string[]" do
    Presentation::Interaction::Registry::REDUCERS
  end

  has_many :interaction_config_templates, serializer: InteractionConfigTemplates::PersistedSerializer do
    circle = @object.presentation&.circle
    circle ? circle.interaction_config_templates.order(:name) : InteractionConfigTemplate.none
  end

  attribute :config do
    @object.config.presence || Presentation::Interaction::BLANK_CONFIG
  end
end
