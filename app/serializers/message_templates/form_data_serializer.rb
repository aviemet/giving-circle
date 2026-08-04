class MessageTemplates::FormDataSerializer < MessageTemplateSerializer
  attribute :mediums, type: "string[]" do
    MessageTemplate::MEDIUMS
  end
end
