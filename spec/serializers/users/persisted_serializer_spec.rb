require "rails_helper"

RSpec.describe Users::PersistedSerializer do
  it "renders slug for a persisted user" do
    user = create(:user)

    payload = described_class.one(user)

    expect(payload[:id] || payload["id"]).to eq(user.id)
    expect(payload[:email] || payload["email"]).to eq(user.email)
    expect(payload[:slug] || payload["slug"]).to eq(user.slug)
  end
end
