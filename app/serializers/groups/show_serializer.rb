class Groups::ShowSerializer < GroupSerializer
  attributes(
    :id,
    :slug,
    :updated_at,
    :created_at,
  )
end
