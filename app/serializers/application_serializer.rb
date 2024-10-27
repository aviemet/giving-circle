class ApplicationSerializer < Oj::Serializer
  include TypesFromSerializers::DSL

  identifier

  def currency_for(field)
    money = @object.send(field)

    return nil if money.nil?

    {
      amount: money.to_f,
      cents: money.cents,
      currency_iso: money.currency.iso_code,
    }
  end

  def self.timestamps
    attributes(
      :updated_at,
      :created_at,
    )
  end
end
