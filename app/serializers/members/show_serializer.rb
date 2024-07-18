class Members::ShowSerializer < MemberSerializer
  include Persisted

  attributes(
    :slug,
  )
end
