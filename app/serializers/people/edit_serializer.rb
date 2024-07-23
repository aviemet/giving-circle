class People::EditSerializer < People::PersistedSerializer
  has_one :user, serializer: UserSerializer
end
