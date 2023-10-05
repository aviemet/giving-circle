class Themes::FormDataSerializer < ApplicationSerializer
  object_as :theme

  identifier :slug

  attributes(
    :title,
    :question,
  )

end
