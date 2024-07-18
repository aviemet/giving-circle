class Members::IndexSerializer < MemberSerializer
  include Persisted

  attributes(
    :slug,
  )
end
