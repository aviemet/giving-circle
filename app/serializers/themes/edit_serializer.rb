class Themes::EditSerializer < ThemeSerializer

  attributes(
    :slug,
    :id,
    :updated_at,
    :created_at,
  )
end