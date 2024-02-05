class Members::IndexSerializer < MemberSerializer
  attributes(
    :id,
    :slug,
    :updated_at,
    :created_at,
  )
end
