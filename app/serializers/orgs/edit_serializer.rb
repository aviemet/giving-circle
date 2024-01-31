class Orgs::EditSerializer < ApplicationSerializer
  object_as :org

  identifier :slug

  attributes(
    :id,
    :name,
    :slug,
    :description,
  )
end
