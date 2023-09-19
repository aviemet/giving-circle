class RoleSerializer < ApplicationSerializer
  object_as :role

  attributes(
    :name,
    :resource_type,
    :resource_id,
    :created_at,
    :updated_at,
  )

  has_many :users, serializer: UserSerializer
end
