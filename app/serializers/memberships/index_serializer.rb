class Memberships::IndexSerializer < Memberships::PersistedSerializer
  belongs_to :person, serializer: People::PersistedSerializer
end
