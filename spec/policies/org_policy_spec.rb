require "rails_helper"

RSpec.describe OrgPolicy, type: :policy do
  let(:org) { create(:org) }
  let(:record) { org }

  describe "#about?" do
    it "allows everyone" do
      expect(described_class.new(nil, org).about?).to be(true)
    end
  end

  describe "#import?" do
    it "allows everyone" do
      expect(described_class.new(nil, org).import?).to be(true)
    end
  end

  it_behaves_like "super_admin_only_policy", %i[show create update destroy]
end
