class Groups::ShowSerializer < GroupSerializer
  include Persisted

  attributes(
    :slug,
  )
end
