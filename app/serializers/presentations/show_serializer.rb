class Presentations::ShowSerializer < Presentations::PersistedSerializer
  has_many :slides, serializer: Slides::ShowSerializer
  belongs_to :template, serializer: Templates::PersistedSerializer, optional: true

  attribute :slides_count, type: :number do
    presentation.slides.size
  end

  attribute :template_id, type: :string do
    presentation.template_id
  end
end
