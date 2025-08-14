class Users::PersistedSerializer < UserSerializer
  include Persisted
  with_slug
end
