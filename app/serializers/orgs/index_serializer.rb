class Orgs::IndexSerializer < Orgs::PersistedSerializer
  belongs_to :circle, serializer: Circles::PersistedSerializer
end
