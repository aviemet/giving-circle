class Memberships::PersistedSerializer < MembershipSerializer
  include Persisted

  attributes(
    :slug,
  )
end
