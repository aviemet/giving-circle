require "rails_helper"

RSpec.describe CirclePolicy, type: :policy do
  let(:circle) { create(:circle) }
  let(:record) { circle }

  describe "#index?" do
    it "allows signed-in users" do
      user = create(:user)

      expect(described_class.new(user, circle).index?).to be(true)
    end

    it "denies guests" do
      expect(described_class.new(nil, circle).index?).to be(false)
    end
  end

  describe "#about?" do
    it "allows everyone" do
      expect(described_class.new(nil, circle).about?).to be(true)
    end
  end

  it_behaves_like "super_admin_only_policy", %i[show create update destroy]
end
