class Circles::FormDataSerializer < ApplicationSerializer
  object_as :circle

  identifier :slug

  attributes(
    :slug,
    :name,
  )
end
