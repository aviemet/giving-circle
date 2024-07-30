class Themes::Orgs::ShowSerializer < Orgs::ShowSerializer
  type "Money"
  def ask
    ask = Money.new(@object.ask_cents)

    {
      amount: ask.to_f,
      cents: ask.cents,
      currency_iso: ask.currency.iso_code,
    }
  end
end
