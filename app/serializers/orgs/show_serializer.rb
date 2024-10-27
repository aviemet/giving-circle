class Orgs::ShowSerializer < Orgs::PersistedSerializer
  belongs_to :circle, serializer: Circles::PersistedSerializer
end
