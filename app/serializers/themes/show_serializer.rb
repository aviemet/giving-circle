class Themes::ShowSerializer < Themes::PersistedSerializer
  belongs_to :circle, serializer: Circles::PersistedSerializer
  has_many :orgs, serializer: Themes::Orgs::ShowSerializer
end
