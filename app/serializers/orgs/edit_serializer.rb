class Orgs::EditSerializer < ApplicationSerializer
  object_as :org

  attributes(
    :id,
    :name,
    :slug,
    :description,
  )
end
