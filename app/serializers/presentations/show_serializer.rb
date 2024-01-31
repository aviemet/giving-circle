class Presentations::ShowSerializer < ApplicationSerializer
  object_as :presentation

  attributes(
    :id,
    :theme_id,
    :name,
    :created_at,
    :updated_at,
  )

  belongs_to :theme, serializer: ThemeSerializer
end
