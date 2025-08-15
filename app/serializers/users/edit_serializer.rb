class Users::EditSerializer < Users::PersistedSerializer
  has_one :person, serializer: PersonSerializer
  has_many :roles, serializer: RoleSerializer
  has_many :circles, serializer: Circles::PersistedSerializer
end
