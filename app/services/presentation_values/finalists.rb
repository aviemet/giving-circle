module PresentationValues
  class Finalists
    DEFAULT_FINALIST_COUNT = 5

    def self.call(presentation, org_vote_totals_by_org: {})
      new(presentation, org_vote_totals_by_org: org_vote_totals_by_org).call
    end

    def self.finalist_source_interaction(presentation)
      presentation.interactions.find_each.find do |interaction|
        config = interaction.config.with_indifferent_access
        outputs = config[:outputs]
        settings = config[:settings] || {}
        next false unless outputs.is_a?(Array)
        next false unless settings[:finalist_count].present?

        outputs.any? { |output| output.with_indifferent_access[:metric] == "org_vote_totals" }
      end
    end

    def initialize(presentation, org_vote_totals_by_org: {})
      @presentation = presentation
      @org_vote_totals_by_org = org_vote_totals_by_org
    end

    def call
      all_org_ids = @presentation.orgs.map(&:id)
      interaction = self.class.finalist_source_interaction(@presentation)
      return all_org_ids if interaction.nil?
      return all_org_ids if interaction.interaction_responses.none?

      count = finalist_count(interaction)
      ranked_org_ids = @org_vote_totals_by_org
        .sort_by { |org_id, votes| [-votes.to_i, org_id.to_s] }
        .map(&:first)

      missing = all_org_ids - ranked_org_ids
      (ranked_org_ids + missing).first(count)
    end

    private

    def finalist_count(interaction)
      settings = interaction.config.with_indifferent_access[:settings] || {}
      value = settings[:finalist_count].to_i
      return DEFAULT_FINALIST_COUNT if value <= 0

      value
    end
  end
end
