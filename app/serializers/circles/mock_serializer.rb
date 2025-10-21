class Circles::MockSerializer < CircleSerializer
  include Persisted
  with_slug

  has_many :themes, serializer: Themes::PersistedSerializer
  has_many :orgs, serializer: Orgs::PersistedSerializer
  has_many :memberships, serializer: Memberships::PersistedSerializer
end
