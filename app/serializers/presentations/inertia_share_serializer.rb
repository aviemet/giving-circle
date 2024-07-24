class Presentations::InertiaShareSerializer < ApplicationSerializer
  object_as :presentation

  identifier :slug

  attributes(
    :id,
    :slug,
    :name,
  )
end
