require "rails_helper"

RSpec.describe "Model Contactable concern" do
  it "defines contact associations when included" do
    path = Rails.root.join("app/models/concerns/contactable.rb")
    wrapped = Module.new
    wrapped.module_eval(File.read(path), path.to_s, 1)
    concern = wrapped.const_get(:Contactable)

    stub_const("ContactablePersonRecord", Class.new(ApplicationRecord) do
      self.table_name = "people"
      include concern
    end)

    expect(ContactablePersonRecord.reflect_on_association(:contact)).to be_present
    expect(ContactablePersonRecord.reflect_on_association(:addresses)).to be_present
    expect(ContactablePersonRecord.reflect_on_association(:phones)).to be_present
    expect(ContactablePersonRecord.reflect_on_association(:emails)).to be_present

    record = ContactablePersonRecord.new(first_name: "Ada", last_name: "Lovelace")
    record.valid?
    expect(record.contact).to be_present
  end
end
