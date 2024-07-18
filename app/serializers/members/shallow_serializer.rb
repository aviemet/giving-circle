class Members::ShallowSerializer < MemberSerializer
  include Persisted

  attributes(
    :slug,
  )
end
