require "rails_helper"

RSpec.describe UserPolicy, type: :policy do
  let(:record) { create(:user) }

  describe "#update_table_preferences?" do
    it "allows super admins" do
      user = create(:user)
      user.add_role(:super_admin)

      expect(described_class.new(user, record).update_table_preferences?).to be(true)
    end

    it "denies unrelated users" do
      user = create(:user)

      expect(described_class.new(user, record).update_table_preferences?).to be(false)
    end
  end

  describe "#update_user_preferences?" do
    it "allows super admins" do
      user = create(:user)
      user.add_role(:super_admin)

      expect(described_class.new(user, record).update_user_preferences?).to be(true)
    end

    it "denies unrelated users" do
      user = create(:user)

      expect(described_class.new(user, record).update_user_preferences?).to be(false)
    end
  end

  it_behaves_like "super_admin_only_policy", %i[show create update destroy]
end
