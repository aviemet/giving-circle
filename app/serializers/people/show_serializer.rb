class People::ShowSerializer < PersonSerializer
  attributes(
    :id,
    :slug,
    :created_at,
    :updated_at,
  )

  has_one :user, serializer: UserSerializer
end
