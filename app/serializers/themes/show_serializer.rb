class Themes::ShowSerializer < Themes::PersistedSerializer
  include Owned

  has_many :orgs, serializer: Themes::Orgs::ShowSerializer
end
