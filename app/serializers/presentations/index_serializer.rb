class Presentations::IndexSerializer < Presentations::PersistedSerializer
  belongs_to :theme, serializer: Themes::ShowSerializer
end
