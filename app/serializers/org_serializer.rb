class OrgSerializer < ApplicationSerializer
  object_as :org

  attributes(
    :name,
    :slug,
    :description,
    :created_at,
    :updated_at,
  )
end
