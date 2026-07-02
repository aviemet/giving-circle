require "rails_helper"

RSpec.describe PresentationPolicy, type: :policy do
  let(:circle) { create(:circle) }
  let(:theme) { create(:theme, circle:) }
  let(:presentation) { create(:presentation, theme:) }

  describe "#activate?" do
    it "allows super admins" do
      user = create(:user)
      user.add_role(:super_admin)

      expect(described_class.new(user, presentation).activate?).to be(true)
    end

    it "allows circle admins" do
      user = create(:user)
      user.add_role(:admin, circle)

      expect(described_class.new(user, presentation).activate?).to be(true)
    end

    it "allows theme admins" do
      user = create(:user)
      user.add_role(:admin, theme)

      expect(described_class.new(user, presentation).activate?).to be(true)
    end

    it "allows theme editors" do
      user = create(:user)
      user.add_role(:editor, theme)

      expect(described_class.new(user, presentation).activate?).to be(true)
    end

    it "denies unrelated users" do
      user = create(:user)

      expect(described_class.new(user, presentation).activate?).to be(false)
    end
  end
end
