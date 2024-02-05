class Members::ShallowSerializer < MemberSerializer
  attributes(
    :id,
    :updated_at,
    :created_at,
  )
end
