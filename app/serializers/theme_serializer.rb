class ThemeSerializer < ApplicationSerializer
  object_as :theme

  identifier :slug

  attributes(
    :title,
    :question,
    :quarter,
  )

end
