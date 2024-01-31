class Orgs::ShowSerializer < ApplicationSerializer
  object_as :org

  identifier :slug

  attributes(
    :id,
    :name,
    :slug,
    :description,
    :created_at,
    :updated_at,
  )
end
