class CircleSerializer < ApplicationSerializer
  object_as :circle

  identifier :slug

  attributes(
    :name,
  )
end
