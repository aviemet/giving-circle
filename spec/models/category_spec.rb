require "rails_helper"

RSpec.describe Category do
  it "builds category_with_type and qty" do
    category = create(:category, categorizable_type: "Address", name: "Qty Cat #{SecureRandom.hex(4)}")
    contact = create(:contact)
    create(:address, category: category, contact: contact)

    expect(category.category_with_type).to eq("Address - #{category.name}")
    expect(category.qty).to eq(1)
  end

  it "rejects duplicate names for the same categorizable type" do
    name = "Dup Cat #{SecureRandom.hex(4)}"
    create(:category, categorizable_type: "Address", name: name)
    duplicate = build(:category, categorizable_type: "Address", name: name)

    expect(duplicate).not_to be_valid
    expect(duplicate.errors[:name]).to be_present
  end
end
