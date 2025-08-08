class Circles::InertiaShareSerializer < ApplicationSerializer
  object_as :circle

  identifier :slug

  attributes(
    :id,
    :slug,
    :name,
  )

  has_many :themes, serializer: Themes::InertiaShareSerializer
end
