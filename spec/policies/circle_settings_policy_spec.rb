require "rails_helper"

RSpec.describe CircleSettingsPolicy, type: :policy do
  let(:circle) { create(:circle) }

  describe "#manage_settings?" do
    it "allows super admins" do
      user = create(:user)
      user.add_role(:super_admin)

      expect(described_class.new(user, circle).manage_settings?).to be(true)
    end

    it "allows circle admins" do
      user = create(:user)
      user.add_role(:admin, circle)

      expect(described_class.new(user, circle).manage_settings?).to be(true)
    end

    it "denies non-admin members" do
      user = create(:user)
      user.add_role(:editor, circle)

      expect(described_class.new(user, circle).manage_settings?).to be(false)
    end
  end
end
