require "rails_helper"

RSpec.describe "Contact serializers" do
  def stub_contact_attrs(contact)
    contact.define_singleton_method(:notes) { nil }
    contact.define_singleton_method(:primary_address_id) { nil }
    contact.define_singleton_method(:primary_phone_id) { nil }
    contact.define_singleton_method(:primary_email_id) { nil }
  end

  def stub_address_attrs(address)
    address.define_singleton_method(:name) { "Home" }
    address.define_singleton_method(:notes) { nil }
  end

  def stub_email_attrs(email)
    email.define_singleton_method(:name) { "Personal" }
    email.define_singleton_method(:notes) { nil }
  end

  def stub_phone_attrs(phone)
    phone.define_singleton_method(:name) { "Mobile" }
    phone.define_singleton_method(:extension) { nil }
  end

  it "renders contact serializer views" do
    contact = create(:contact)
    stub_contact_attrs(contact)

    expect(ContactSerializer.one(contact)[:contactable_type] || ContactSerializer.one(contact)["contactable_type"]).to eq("Person")
    expect(Contacts::IndexSerializer.one(contact)[:id] || Contacts::IndexSerializer.one(contact)["id"]).to eq(contact.id)
    expect(Contacts::ShowSerializer.one(contact)).to be_present
    expect(Contacts::EditSerializer.one(contact)).to be_present
    expect(Contacts::FormDataSerializer.one(contact)).to be_present
  end

  it "renders persisted contact with nested address email and phone" do
    contact = create(:contact)
    address = create(:address, contact: contact)
    email = create(:email, contact: contact)
    phone = create(:phone, contact: contact)
    stub_contact_attrs(contact)
    stub_address_attrs(address)
    stub_email_attrs(email)
    stub_phone_attrs(phone)

    allow(contact).to receive_messages(addresses: [address], emails: [email], phones: [phone])

    payload = Contacts::PersistedSerializer.one(contact)
    expect(payload[:contactable_id] || payload["contactable_id"]).to eq(contact.contactable_id)
  end

  it "renders address email and phone serializers" do
    contact = create(:contact)
    address = create(:address, contact: contact)
    email = create(:email, contact: contact)
    phone = create(:phone, contact: contact)
    stub_address_attrs(address)
    stub_email_attrs(email)
    stub_phone_attrs(phone)

    expect(AddressSerializer.one(address)[:city] || AddressSerializer.one(address)["city"]).to eq(address.city)
    expect(EmailSerializer.one(email)[:email] || EmailSerializer.one(email)["email"]).to eq(email.email)
    expect(PhoneSerializer.one(phone)[:number] || PhoneSerializer.one(phone)["number"]).to eq(phone.number)
  end
end
