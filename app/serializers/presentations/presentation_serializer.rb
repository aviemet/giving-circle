class Presentations::PresentationSerializer < Presentations::PersistedSerializer
  attributes(
    :active_slide_id,
  )

  has_many :slides, serializer: Slides::PresentationSerializer
  has_many :orgs, serializer: Orgs::PersistedSerializer
end
