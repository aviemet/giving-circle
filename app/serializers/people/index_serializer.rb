class People::IndexSerializer < PersonSerializer
  attributes(
    :id,
    :created_at,
    :updated_at,
  )
end
