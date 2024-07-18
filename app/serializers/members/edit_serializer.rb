class Members::EditSerializer < MemberSerializer
  include Persisted

  attributes(
    :slug,
  )
end
