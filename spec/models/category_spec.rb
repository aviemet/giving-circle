require "rails_helper"

# == Schema Information
#
# Table name: categories
#
#  id                 :uuid             not null, primary key
#  categorizable_type :string           not null
#  description        :text
#  name               :string           not null
#  slug               :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_categories_on_name_and_categorizable_type  (name,categorizable_type) UNIQUE
#  index_categories_on_slug                         (slug) UNIQUE
#
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
