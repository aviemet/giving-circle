class Themes::ShowSerializer < ThemeSerializer
  attributes(
    :slug,
    :id,
    :updated_at,
    :created_at,
  )
end
