class Themes::ShallowSerializer < ThemeSerializer
  attributes(
    :slug,
    :id,
    :updated_at,
    :created_at,
  )
end
