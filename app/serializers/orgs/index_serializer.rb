class Orgs::IndexSerializer < OrgSerializer
  attributes(
    :slug,
    :id,
    :updated_at,
    :created_at,
  )

  belongs_to :circle, serializer: Circles::ShareSerializer
end
