require "rails_helper"

RSpec.describe Presentation::InteractionPolicy, type: :policy do
  let(:record) { create(:presentation_interaction) }

  it_behaves_like "super_admin_only_policy", %i[show create update destroy]

  describe "#open_responses?" do
    it "allows super admins" do
      user = create(:user)
      user.add_role(:super_admin)

      expect(described_class.new(user, record).open_responses?).to be(true)
    end

    it "denies unrelated users" do
      user = create(:user)

      expect(described_class.new(user, record).open_responses?).to be(false)
    end
  end

  describe "#close_responses?" do
    it "allows super admins" do
      user = create(:user)
      user.add_role(:super_admin)

      expect(described_class.new(user, record).close_responses?).to be(true)
    end

    it "denies unrelated users" do
      user = create(:user)

      expect(described_class.new(user, record).close_responses?).to be(false)
    end
  end
end
