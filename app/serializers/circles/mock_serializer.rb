class Circles::MockSerializer < CircleSerializer
  include Persisted
  with_slug

  has_many :themes, serializer: Themes::PersistedSerializer
  has_many :orgs, serializer: Orgs::PersistedSerializer
  has_many :memberships, serializer: Memberships::PersistedSerializer

  attribute :finalist_count, type: :number do
    presentation = Presentation.joins(:theme).find_by(themes: { circle_id: circle.id })
    presentation&.settings&.finalist_count || Presentation::Settings::FINALIST_COUNT_DEFAULT
  end
end
