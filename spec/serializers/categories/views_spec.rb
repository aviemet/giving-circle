require "rails_helper"

RSpec.describe "Category serializers" do
  it "renders category serializer views" do
    category = create(:category, categorizable_type: "Address", name: "Serializer Cat #{SecureRandom.hex(4)}")

    expect(CategorySerializer.one(category)[:name] || CategorySerializer.one(category)["name"]).to eq(category.name)
    expect(Categories::BasicSerializer.one(category)[:slug] || Categories::BasicSerializer.one(category)["slug"]).to eq(category.slug)
    expect(Categories::IndexSerializer.one(category)[:plural] || Categories::IndexSerializer.one(category)["plural"]).to eq("Addresses")
    expect(Categories::ShowSerializer.one(category)[:qty] || Categories::ShowSerializer.one(category)["qty"]).to eq(0)
    expect(Categories::OptionsSerializer.one(category)[:category_with_type] || Categories::OptionsSerializer.one(category)["category_with_type"]).to eq(category.category_with_type)
    expect(Categories::PersistedSerializer.one(category)[:id] || Categories::PersistedSerializer.one(category)["id"]).to eq(category.id)
    expect(Categories::EditSerializer.one(category)).to be_present
    expect(Categories::FormDataSerializer.one(category)).to be_present
  end
end
