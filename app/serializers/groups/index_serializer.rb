class Groups::IndexSerializer < GroupSerializer
  attributes(
    :id,
    :slug,
    :updated_at,
    :created_at,
  )
end
