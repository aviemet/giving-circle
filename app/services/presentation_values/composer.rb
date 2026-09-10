module PresentationValues
  class Composer
    ORG_MONEY_METRICS = %w[allocated_totals pledge_totals].freeze

    def self.enrich(presentation, raw_snapshot, funding_basis: nil, leverage_funding_basis: nil)
      new(
        presentation,
        raw_snapshot,
        funding_basis: funding_basis,
        leverage_funding_basis: leverage_funding_basis,
      ).call
    end

    def initialize(presentation, raw_snapshot, funding_basis: nil, leverage_funding_basis: nil)
      @presentation = presentation
      @raw_snapshot = raw_snapshot.with_indifferent_access
      @funding_basis = Array(funding_basis).presence
      @leverage_funding_basis = Array(leverage_funding_basis).presence
    end

    def call
      basis = @funding_basis || default_leverage_funding_basis
      leverage_basis = @leverage_funding_basis || @presentation.settings.leverage_funding_basis

      funding_by_org = sum_org_money_metrics(basis)
      ask_by_org = ask_cents_by_org
      funded_org_ids = funded_org_ids_for(funding_by_org, ask_by_org)
      leverage = build_leverage(leverage_basis, ask_by_org)

      @raw_snapshot.merge(
        funding_totals: build_funding_totals(funding_by_org),
        funded_org_ids: funded_org_ids,
        leverage: leverage,
      )
    end

    private

    def default_leverage_funding_basis
      @presentation.settings.leverage_funding_basis
    end

    def sum_org_money_metrics(metrics)
      totals = {}

      metrics.each do |metric|
        next unless ORG_MONEY_METRICS.include?(metric)

        entries = @raw_snapshot[metric]
        next unless entries.is_a?(Array)

        entries.each do |entry|
          entry = entry.with_indifferent_access
          org_id = entry[:org_id]
          amount_cents = if metric == "pledge_totals"
                           entry[:pledge_cents]
                         else
                           entry[:allocated_cents]
                         end
          next if org_id.blank? || amount_cents.blank?

          totals[org_id] = totals.fetch(org_id, 0) + amount_cents.to_i
        end
      end

      @presentation.orgs.find_each do |org|
        totals[org.id] = totals.fetch(org.id, 0)
      end

      totals
    end

    def ask_cents_by_org
      @presentation.orgs.index_by(&:id).transform_values { |org| org.ask_cents.to_i }
    end

    def funded_org_ids_for(funding_by_org, ask_by_org)
      funding_by_org.filter_map do |org_id, funding_cents|
        ask_cents = ask_by_org[org_id]
        next if ask_cents.nil? || ask_cents <= 0
        next unless funding_cents >= ask_cents

        org_id
      end
    end

    def build_funding_totals(funding_by_org)
      funding_by_org.map do |org_id, funding_cents|
        {
          org_id: org_id,
          funding_cents: funding_cents,
          currency: "USD",
        }
      end
    end

    def build_leverage(leverage_basis, ask_by_org)
      funding_by_org = sum_org_money_metrics(leverage_basis)
      total_ask_cents = ask_by_org.values.sum
      funded_cents = funding_by_org.values.sum
      remaining_cents = [total_ask_cents - funded_cents, 0].max

      {
        remaining_cents: remaining_cents,
        total_ask_cents: total_ask_cents,
        currency: "USD",
      }
    end
  end
end
