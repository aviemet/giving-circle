module PresentationValues
  class Aggregator
    REDUCERS = {
      "sum_by_org" => :reduce_sum_by_org,
      "count_by_value" => :reduce_count_by_value,
      "sum_money" => :reduce_sum_money,
      "rank_aggregate" => :reduce_rank_aggregate,
    }.freeze

    def self.call(presentation)
      new(presentation).call
    end

    def initialize(presentation)
      @presentation = presentation
    end

    def call
      allocated_totals_by_org = {}
      org_vote_totals_by_org = {}
      vote_counts = {}
      money_totals_cents = 0
      rank_totals = {}
      tracks_allocated_totals = false
      tracks_org_vote_totals = false

      @presentation.interactions.includes(:interaction_responses, :interaction_ui_template).find_each do |interaction|
        result = apply_interaction_outputs(
          interaction,
          allocated_totals_by_org: allocated_totals_by_org,
          org_vote_totals_by_org: org_vote_totals_by_org,
          vote_counts: vote_counts,
          money_totals_cents: money_totals_cents,
          rank_totals: rank_totals,
        )
        tracks_allocated_totals ||= result[:tracks_allocated_totals]
        tracks_org_vote_totals ||= result[:tracks_org_vote_totals]
        money_totals_cents = result[:money_totals_cents]
      end

      {
        allocated_totals: tracks_allocated_totals ? build_allocated_totals(allocated_totals_by_org) : [],
        org_vote_totals: tracks_org_vote_totals ? build_org_vote_totals(org_vote_totals_by_org) : [],
        finalist_org_ids: PresentationValues::Finalists.call(
          @presentation,
          org_vote_totals_by_org: org_vote_totals_by_org,
        ),
        vote_counts: vote_counts.map { |value, count| { value: value, count: count } },
        money_totals: money_totals_cents.positive? ? [{ total_cents: money_totals_cents, currency: "USD" }] : [],
        rank_totals: rank_totals.map { |org_id, score| { org_id: org_id, score: score } },
      }
    end

    private

    def apply_interaction_outputs(
      interaction,
      allocated_totals_by_org:,
      org_vote_totals_by_org:,
      vote_counts:,
      money_totals_cents:,
      rank_totals:
    )
      config = interaction.config.with_indifferent_access
      outputs = config[:outputs]
      return {
        tracks_allocated_totals: false,
        tracks_org_vote_totals: false,
        money_totals_cents: money_totals_cents,
      } unless outputs.is_a?(Array)

      field_index = index_fields(config[:fields])
      tracks_allocated_totals = false
      tracks_org_vote_totals = false

      outputs.each do |output|
        output = output.with_indifferent_access
        metric = output[:metric]
        source_field = output[:source_field]
        reducer = output[:reducer]
        next if metric.blank? || source_field.blank? || reducer.blank?

        field = field_index[source_field]
        next unless field

        reducer_method = REDUCERS[reducer]
        next unless reducer_method

        partial = send(reducer_method, interaction, source_field, field)

        case metric
        when "allocated_totals"
          merge_allocated_totals(allocated_totals_by_org, partial)
          tracks_allocated_totals = true
        when "org_vote_totals"
          merge_allocated_totals(org_vote_totals_by_org, partial)
          tracks_org_vote_totals = true
        when "vote_counts"
          merge_counts(vote_counts, partial)
        when "money_totals"
          money_totals_cents += partial.to_i
        when "rank_totals"
          merge_rank_totals(rank_totals, partial)
        end
      end

      {
        tracks_allocated_totals: tracks_allocated_totals,
        tracks_org_vote_totals: tracks_org_vote_totals,
        money_totals_cents: money_totals_cents,
      }
    end

    def index_fields(fields, index = {})
      return index unless fields.is_a?(Array)

      fields.each do |field|
        next unless field.is_a?(Hash)

        field = field.with_indifferent_access
        index[field[:key]] = field if field[:key].present?

        if field[:type] == "field_group"
          index_fields(field[:fields], index)
        end
      end

      index
    end

    def reduce_sum_by_org(interaction, source_field, field)
      return {} unless field.with_indifferent_access[:type] == "org_money_map"

      totals_by_org = {}

      interaction.interaction_responses.find_each do |response|
        field_data = response.response_data.with_indifferent_access[source_field]
        extract_org_money_map(field_data).each do |org_id, amount_cents|
          totals_by_org[org_id] = totals_by_org.fetch(org_id, 0) + amount_cents
        end
      end

      totals_by_org
    end

    def reduce_count_by_value(interaction, source_field, field)
      field_type = field.with_indifferent_access[:type]
      return {} unless %w[org_reference single_select].include?(field_type)

      counts = {}

      interaction.interaction_responses.find_each do |response|
        value = response.response_data.with_indifferent_access[source_field]
        next if value.blank?

        counts[value] = counts.fetch(value, 0) + 1
      end

      counts
    end

    def reduce_sum_money(interaction, source_field, field)
      return 0 unless field.with_indifferent_access[:type] == "money"

      total = 0

      interaction.interaction_responses.find_each do |response|
        value = response.response_data.with_indifferent_access[source_field]
        next unless value.is_a?(Hash)

        amount_cents = value.with_indifferent_access[:amount_cents]
        total += amount_cents.to_i if amount_cents.present?
      end

      total
    end

    def reduce_rank_aggregate(interaction, source_field, field)
      return {} unless field.with_indifferent_access[:type] == "org_ranked_list"

      scores = {}

      interaction.interaction_responses.find_each do |response|
        field_data = response.response_data.with_indifferent_access[source_field]
        next unless field_data.is_a?(Array)

        field_data.each do |entry|
          entry = entry.with_indifferent_access
          org_id = entry[:org_id]
          rank = entry[:rank]
          next if org_id.blank? || rank.blank?

          scores[org_id] = scores.fetch(org_id, 0) + rank.to_i
        end
      end

      scores
    end

    def merge_allocated_totals(totals_by_org, partial)
      partial.each do |org_id, amount_cents|
        totals_by_org[org_id] = totals_by_org.fetch(org_id, 0) + amount_cents
      end
    end

    def merge_counts(counts, partial)
      partial.each do |value, count|
        counts[value] = counts.fetch(value, 0) + count
      end
    end

    def merge_rank_totals(rank_totals, partial)
      partial.each do |org_id, score|
        rank_totals[org_id] = rank_totals.fetch(org_id, 0) + score
      end
    end

    def build_allocated_totals(totals_by_org)
      @presentation.orgs.find_each do |org|
        totals_by_org[org.id] = totals_by_org.fetch(org.id, 0)
      end

      totals_by_org.map do |org_id, amount_cents|
        {
          org_id: org_id,
          allocated_cents: amount_cents,
          currency: "USD",
        }
      end
    end

    def build_org_vote_totals(totals_by_org)
      @presentation.orgs.find_each do |org|
        totals_by_org[org.id] = totals_by_org.fetch(org.id, 0)
      end

      totals_by_org.map do |org_id, votes|
        {
          org_id: org_id,
          votes: votes,
        }
      end
    end

    def extract_org_money_map(field_data)
      return {} if field_data.blank? || !field_data.is_a?(Array)

      amounts = {}

      field_data.each do |entry|
        entry = entry.with_indifferent_access
        org_id = entry[:org_id]
        amount_cents = entry[:amount_cents]
        next if org_id.blank? || amount_cents.blank?

        amounts[org_id] = amounts.fetch(org_id, 0) + amount_cents.to_i
      end

      amounts
    end
  end
end
