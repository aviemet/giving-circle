class Themes::ShowSerializer < ApplicationSerializer
  object_as :theme

  identifier :slug

  attributes(
    :id,
    :slug,
    :title,
    :published,
    :status,
    :created_at,
    :updated_at,
  )

  belongs_to :circle, serializer: Circles::ShareSerializer
end
