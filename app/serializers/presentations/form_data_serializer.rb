class Presentations::FormDataSerializer < ApplicationSerializer
  object_as :presentation

  attributes(
    :theme_id,
    :name,
  )

  belongs_to :theme, serializer: ThemeSerializer
end
