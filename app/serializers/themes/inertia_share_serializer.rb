class Themes::InertiaShareSerializer < ApplicationSerializer
  object_as :theme

  identifier :slug

  attributes(
    :slug,
    :id,
    :name,
  )
end
