require "rails_helper"

RSpec.describe "People serializers" do
  it "renders people serializer views" do
    person = create(:person)
    create(:user, person: person)

    expect(People::IndexSerializer.one(person)[:first_name] || People::IndexSerializer.one(person)["first_name"]).to eq(person.first_name)
    expect(People::ShowSerializer.one(person)).to be_present
    expect(People::EditSerializer.one(person)).to be_present
    expect(People::FormDataSerializer.one(person)).to be_present
  end
end
