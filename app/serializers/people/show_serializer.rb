class People::ShowSerializer < People::PersistedSerializer
  has_one :user, serializer: UserSerializer
end
