require "rails_helper"

RSpec.describe Categorizable do
  describe "default category assignment" do
    it "assigns the Other category for addresses on create" do
      other = Category.find_by!(name: "Other", categorizable_type: "Address")
      address = build(:address, category: nil)
      address.save!

      expect(address.category).to eq(other)
    end
  end
end
