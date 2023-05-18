class Themes::FormDataSerializer < ApplicationSerializer
  object_as :theme

  attributes(
    :title,
    :question,
    :quarter,
  )
end
