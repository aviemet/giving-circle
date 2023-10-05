class Themes::ShowSerializer < ApplicationSerializer
  object_as :theme

  identifier :slug

  attributes(
    :id,
    :slug,
    :title,
    :question,
    :created_at,
    :updated_at,
  )

end
