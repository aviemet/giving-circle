class Themes::FormDataSerializer < ApplicationSerializer
  object_as :theme

  identifier :slug

  attributes(
    :title,
    :question,
  )

  belongs_to :circle, serializer: Circles::ShareSerializer
end
