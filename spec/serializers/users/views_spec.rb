require "rails_helper"

RSpec.describe "User serializers" do
  it "renders index, show, edit, and form_data views" do
    user = create(:user)

    expect(Users::IndexSerializer.one(user)[:email] || Users::IndexSerializer.one(user)["email"]).to eq(user.email)
    expect(Users::ShowSerializer.one(user)[:id] || Users::ShowSerializer.one(user)["id"]).to eq(user.id)
    expect(Users::EditSerializer.one(user)[:slug] || Users::EditSerializer.one(user)["slug"]).to eq(user.slug)
    expect(Users::FormDataSerializer.one(user)).to be_present
  end
end
