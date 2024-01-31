class People::EditSerializer < PersonSerializer
  attributes(
    :id,
    :created_at,
    :updated_at,
  )

  has_one :user, serializer: UserSerializer
end
