class Orgs::EditSerializer < OrgSerializer

  attributes(
    :slug,
    :id,
    :updated_at,
    :created_at,
  )
end
