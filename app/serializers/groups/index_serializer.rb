class Groups::IndexSerializer < GroupSerializer
  include Persisted

  attributes(
    :slug,
  )
end
