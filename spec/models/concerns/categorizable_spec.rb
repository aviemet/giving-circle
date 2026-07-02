require "rails_helper"

RSpec.describe Categorizable do
  describe "default category assignment" do
    it "assigns the Other category for addresses on create" do
      other = create(:category, :for_address, :other)
      address = build(:address, category: nil)
      address.save!

      expect(address.category).to eq(other)
    end
  end
end
