class Themes::ShowSerializer < Themes::PersistedSerializer
  belongs_to :circle, serializer: Circles::PersistedSerializer
end
