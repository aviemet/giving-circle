class Users::ShowSerializer < Users::PersistedSerializer
  attributes(
    table_preferences: { type: "IUserTablePreferences" },
    user_preferences: { type: "IUserPreferences" },
  )

  timestamps

  has_one :person, serializer: PersonSerializer
  has_many :roles, serializer: RoleSerializer
  has_many :circles, serializer: Circles::PersistedSerializer
end
