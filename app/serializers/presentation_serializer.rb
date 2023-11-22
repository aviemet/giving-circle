class PresentationSerializer < ApplicationSerializer
  object_as :presentation

  identifier :id

  attributes(
    :id,
    :name,
  )
end
