module Messaging
  class BatchResult
    attr_reader :outcomes_by_membership_id

    def initialize(outcomes = [])
      @outcomes_by_membership_id = {}
      outcomes.each { |outcome| add(outcome) }
    end

    def add(outcome)
      @outcomes_by_membership_id[outcome.membership_id.to_s] = outcome
    end

    def to_delivery_results
      outcomes_by_membership_id.transform_values(&:to_h)
    end

    def merge!(other)
      other.outcomes_by_membership_id.each_value { |outcome| add(outcome) }
      self
    end
  end
end
