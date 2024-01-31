class Members::IndexSerializer < MemberSerializer
  attributes(
    :id,
    :updated_at,
    :created_at,
  )
end
