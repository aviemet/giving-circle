class People::IndexSerializer < PersonSerializer
  attributes(
    :id,
    :slug,
    :created_at,
    :updated_at,
  )
end
