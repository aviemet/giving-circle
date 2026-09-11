module PresentationValues
  class Finalists
    def self.call(presentation, org_vote_totals_by_org: {})
      new(presentation, org_vote_totals_by_org: org_vote_totals_by_org).call
    end

    def self.finalist_source_interaction(presentation)
      presentation.interactions.find_each.find do |interaction|
        config = interaction.config.with_indifferent_access
        outputs = config[:outputs]
        next false unless outputs.is_a?(Array)

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

      count = @presentation.settings.finalist_count
      ranked_org_ids = @org_vote_totals_by_org
        .sort_by { |org_id, votes| [-votes.to_i, org_id.to_s] }
        .map(&:first)

      missing = all_org_ids - ranked_org_ids
      (ranked_org_ids + missing).first(count)
    end
  end
end
