class Themes::FormDataSerializer < ApplicationSerializer
  object_as :theme

  identifier :slug

  attributes(
    :title,
    :published,
    :status,
  )

  belongs_to :circle, serializer: Circles::ShareSerializer
end
