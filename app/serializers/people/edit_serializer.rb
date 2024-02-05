class People::EditSerializer < PersonSerializer
  attributes(
    :id,
    :slug,
    :created_at,
    :updated_at,
  )

  has_one :user, serializer: UserSerializer
end
