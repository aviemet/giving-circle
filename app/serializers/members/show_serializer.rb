class Members::ShowSerializer < MemberSerializer
  attributes(
    :id,
    :updated_at,
    :created_at,
  )
end
