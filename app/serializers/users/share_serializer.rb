class Users::ShareSerializer < ApplicationSerializer
  object_as :user

  attributes(
    :id,
    :email,
    :created_at,
    :updated_at,
  )

  has_many :circles, serializer: CircleSerializer
end
