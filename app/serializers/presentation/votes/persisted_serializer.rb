class Presentation::Votes::PersistedSerializer < Presentation::VoteSerializer
  include Persisted

  attributes(
    :id,
  )
end
