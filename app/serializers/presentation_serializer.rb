class PresentationSerializer < ApplicationSerializer
  object_as :presentation

  attributes(
    :theme_id,
    :name,
    :created_at,
    :updated_at,
  )
end
