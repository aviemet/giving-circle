class ThemeSerializer < ApplicationSerializer
  object_as :theme

  identifier :slug

  attributes(
    :id,
    :title,
    :published,
    :status,
  )

end
