class Orgs::ShowSerializer < OrgSerializer
  attributes(
    :slug,
    :id,
    :updated_at,
    :created_at,
  )

  belongs_to :circle, serializer: Circles::OptionsSerializer
end
