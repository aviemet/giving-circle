class Users::InertiaShareSerializer < UserSerializer
  attributes(
    :id,
    :created_at,
    :updated_at,
    table_preferences: { type: "IUserTablePreferences" },
    user_preferences: { type: "IUserPreferences" },
  )

  has_one :person, serializer: PersonSerializer
  has_many :roles, serializer: RoleSerializer
  has_many :circles, serializer: Circles::PersistedSerializer
end
