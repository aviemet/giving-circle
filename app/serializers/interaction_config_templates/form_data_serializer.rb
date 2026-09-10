class InteractionConfigTemplates::FormDataSerializer < InteractionConfigTemplateSerializer
  attribute :field_types, type: "string[]" do
    Interactions::Registry::FIELD_TYPES
  end

  attribute :metrics, type: "string[]" do
    Interactions::Registry::METRICS
  end

  attribute :reducers, type: "string[]" do
    Interactions::Registry::REDUCERS
  end

  has_many :interaction_ui_templates, serializer: InteractionUiTemplates::PersistedSerializer do
    InteractionUiTemplate.order(:name)
  end

  attribute :config do
    @object.config.presence || Presentation::Interaction::BLANK_CONFIG
  end
end
