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
require "rails_helper"

RSpec.describe Category do
  subject(:category) { build(:category) }

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(category).to be_valid
    end

    it "is not valid without a name" do
      category.name = nil
      expect(category).not_to be_valid
    end

    it "is not valid without a categorizable_type" do
      category.categorizable_type = nil
      expect(category).not_to be_valid
    end

    it "is not valid with an unsupported categorizable_type" do
      category.categorizable_type = "Org"
      expect(category).not_to be_valid
    end

    it "does not allow duplicate names within the same categorizable_type" do
      create(:category, name: "Duplicate Name", categorizable_type: "Address")
      duplicate = build(:category, name: "Duplicate Name", categorizable_type: "Address")

      expect(duplicate).not_to be_valid
    end
  end

  describe "#records" do
    it "returns records assigned to the category" do
      category = create(:category, :for_address, name: "Records Test")
      address = create(:address, category: category)

      expect(category.records).to contain_exactly(address)
    end
  end

  describe "FriendlyId" do
    it "generates a slug from categorizable type and name" do
      category = create(:category, :for_email, name: "Personal")

      expect(category.slug).to eq("email-personal")
    end
  end
end
