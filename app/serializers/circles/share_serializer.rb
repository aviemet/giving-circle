class Circles::ShareSerializer < ApplicationSerializer
  object_as :circle

  identifier :slug

  attributes(
    :id,
    :slug,
    :name,
  )
end
