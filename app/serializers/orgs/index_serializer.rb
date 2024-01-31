class Orgs::IndexSerializer < OrgSerializer
  attributes(
    :slug,
    :id,
    :updated_at,
    :created_at,
  )
end
