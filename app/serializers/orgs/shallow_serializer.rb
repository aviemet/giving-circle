class Orgs::ShallowSerializer < OrgSerializer
  attributes(
    :slug,
    :id,
    :updated_at,
    :created_at,
  )
end
