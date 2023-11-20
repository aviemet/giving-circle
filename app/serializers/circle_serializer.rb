class CircleSerializer < ApplicationSerializer
  object_as :circle

  identifier :slug

  attributes(
    :id,
    :slug,
    :name,
  )
end
