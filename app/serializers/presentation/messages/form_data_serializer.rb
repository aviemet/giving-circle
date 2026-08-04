class Presentation::Messages::FormDataSerializer < Presentation::MessageSerializer
  attribute :mediums, type: "string[]" do
    Presentation::Message::MEDIUMS
  end

  has_many :integrations, serializer: Integrations::PersistedSerializer do
    circle = @object.presentation&.circle
    next [] if circle.nil?

    scope = circle.integrations.active
    if @object.medium.present?
      scope = scope.for_medium(@object.medium)
    end
    scope.order(:name)
  end

  has_many :message_templates, serializer: MessageTemplates::PersistedSerializer do
    circle = @object.presentation&.circle
    next [] if circle.nil?

    scope = circle.message_templates
    if @object.medium.present?
      scope = scope.where(medium: @object.medium)
    end
    scope.order(:name)
  end

  has_many :interactions, serializer: Presentation::Interactions::PersistedSerializer do
    @object.presentation&.interactions&.order(:name) || []
  end
end
