class Orgs::PersistedSerializer < OrgSerializer
  include Persisted
  with_slug
end
