class Orgs::ShowSerializer < OrgSerializer
  attributes(
    :slug,
    :id,
    :updated_at,
    :created_at,
  )
end
