class UserSerializer < ApplicationSerializer
  object_as :user

  attributes(
    :email,
    :remember_created_at,
    :created_at,
    :updated_at,
  )
end
