class PresentationSlides::EditSerializer < PresentationSlideSerializer

  attributes(
    :slug,
    :id,
    :updated_at,
    :created_at,
  )
end
