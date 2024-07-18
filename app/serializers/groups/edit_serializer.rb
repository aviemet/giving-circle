class Groups::EditSerializer < GroupSerializer
  include Persisted

  attributes(
    :slug,
  )
end
