class Presentation::Distributions::PersistedSerializer < Presentation::DistributionSerializer
  include Persisted

  attributes(
    :id,
  )
end
