class Orgs::FormDataSerializer < ApplicationSerializer
  object_as :org

  attributes(
    :name,
    :slug,
    :description,
  )
end
