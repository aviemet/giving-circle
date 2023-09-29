class Users::ShareSerializer < ApplicationSerializer
  object_as :user

  attributes(
    :id,
    :email,
    :active_circle_id,
    :created_at,
    :updated_at,
  )

  belongs_to :active_circle, serializer: Circles::ShareSerializer
  has_many :circles, serializer: Circles::ShareSerializer
end
