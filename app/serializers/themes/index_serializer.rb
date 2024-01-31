class Themes::IndexSerializer < ApplicationSerializer
  object_as :theme

  identifier :slug

  attributes(
    :id,
    :slug,
    :title,
    :published,
    :status,
  )

  belongs_to :circle, serializer: Circles::ShareSerializer
end
