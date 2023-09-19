class Themes::IndexSerializer < ApplicationSerializer
  object_as :theme

  identifier :slug

  attributes(
    :id,
    :slug,
    :title,
    :question,
    :quarter,
  )

end
