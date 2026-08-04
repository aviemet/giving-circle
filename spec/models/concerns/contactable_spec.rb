require "rails_helper"

RSpec.describe "Model Contactable concern" do
  it "defines contact associations when included" do
    stub_const("ContactablePersonRecord", Class.new(ApplicationRecord) do
      self.table_name = "people"
      include Contactable
    end,)

    expect(ContactablePersonRecord.reflect_on_association(:contact)).to be_present
    expect(ContactablePersonRecord.reflect_on_association(:addresses)).to be_present
    expect(ContactablePersonRecord.reflect_on_association(:phones)).to be_present
    expect(ContactablePersonRecord.reflect_on_association(:emails)).to be_present

    record = ContactablePersonRecord.new(first_name: "Ada", last_name: "Lovelace")
    record.valid?
    expect(record.contact).to be_present
  end
end
