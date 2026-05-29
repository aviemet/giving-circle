class Themes::ShowSerializer < Themes::PersistedSerializer
  include Owned

  has_many :orgs, serializer: Themes::Orgs::ShowSerializer
  has_many :presentations, serializer: Themes::Presentations::SummarySerializer

  attribute :orgs_count, type: :number do
    theme.orgs.size
  end

  attribute :presentations_count, type: :number do
    theme.presentations.size
  end

  attribute :total_ask_cents, type: :number do
    theme.themes_orgs.sum(:ask_cents)
  end

  attribute :total_ask_currency, type: :string do
    theme.themes_orgs.first&.ask_currency || "USD"
  end
end
