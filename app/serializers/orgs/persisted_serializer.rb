class Orgs::PersistedSerializer < OrgSerializer
  include Persisted

  attributes(
    :slug,
  )
end
