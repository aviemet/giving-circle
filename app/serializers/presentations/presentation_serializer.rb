class Presentations::PresentationSerializer < Presentations::PersistedSerializer
  attributes(
    :active_slide_id,
  )

  has_many :slides, serializer: Slides::PresentationSerializer
  has_many :orgs, serializer: Presentations::Orgs::PersistedSerializer

  def orgs
    collection = presentation.orgs.to_a
    collection.empty? ? presentation.theme.orgs.to_a : collection
  end
end
