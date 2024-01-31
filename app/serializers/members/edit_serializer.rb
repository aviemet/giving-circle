class Members::EditSerializer < MemberSerializer

  attributes(
    :id,
    :updated_at,
    :created_at,
  )
end
