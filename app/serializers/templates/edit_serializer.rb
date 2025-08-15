class Templates::EditSerializer < Templates::PersistedSerializer
  has_many :slides, serializer: Slides::EditSerializer
end
