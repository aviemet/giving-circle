class ThemeSerializer < ApplicationSerializer
  object_as :theme

  attributes(
    :title,
    :question,
    :quarter,
  )

end
