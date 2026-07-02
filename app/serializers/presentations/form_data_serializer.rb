class Presentations::FormDataSerializer < PresentationSerializer
  has_many :slides, serializer: Slides::FormDataSerializer

  attribute :template_id, type: :string do
    presentation.template_id
  end
end
