require "rails_helper"

RSpec.describe "Smtp serializers" do
  it "renders show and form_data views" do
    smtp = create(:smtp)

    expect(Smtps::ShowSerializer.one(smtp)[:name] || Smtps::ShowSerializer.one(smtp)["name"]).to eq(smtp.name)
    expect(Smtps::FormDataSerializer.one(smtp)).to be_present
  end
end
