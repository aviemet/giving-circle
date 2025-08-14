class Memberships::PersistedSerializer < MembershipSerializer
  include Persisted
  with_slug
end
