class Circles::FormDataSerializer < ApplicationSerializer
  identifier :slug

  attributes(
    :name,
  )
end
