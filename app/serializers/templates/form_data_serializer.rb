class Templates::FormDataSerializer < TemplateSerializer
  has_many :slides, serializer: Slides::FormDataSerializer
end
