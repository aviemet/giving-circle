class Members::PersistedSerializer < MemberSerializer
  include Persisted

  attributes(
    :slug,
  )
end
