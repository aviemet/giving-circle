class Circles::IndexSerializer < Circles::PersistedSerializer
  has_many :themes, serializer: Themes::PersistedSerializer

  attribute :themes_count, type: :number do
    circle.themes.size
  end

  attribute :memberships_count, type: :number do
    circle.memberships.size
  end
end
