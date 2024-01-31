class Presentations::EditSerializer < ApplicationSerializer
  object_as :presentation

  attributes(
    :id,
    :theme_id,
    :name,
  )

  belongs_to :theme, serializer: ThemeSerializer
end
