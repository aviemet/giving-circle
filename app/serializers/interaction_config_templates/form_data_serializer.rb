class InteractionConfigTemplates::FormDataSerializer < InteractionConfigTemplateSerializer
  attribute :field_types, type: "string[]" do
    Presentation::Interaction::Registry::FIELD_TYPES
  end

  attribute :metrics, type: "string[]" do
    Presentation::Interaction::Registry::METRICS
  end

  attribute :reducers, type: "string[]" do
    Presentation::Interaction::Registry::REDUCERS
  end

  attribute :config do
    @object.config.presence || Presentation::Interaction::BLANK_CONFIG
  end
end
