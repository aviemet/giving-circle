require "rails_helper"

RSpec.describe Presentation::ActivePolicy, type: :policy do
  let(:circle) { create(:circle) }
  let(:theme) { create(:theme, circle:) }
  let(:presentation) { create(:presentation, theme:, active: true) }

  describe "#public_show?" do
    it "denies inactive presentations" do
      inactive = create(:presentation, theme:, active: false)
      user = create(:user)
      user.add_role(:super_admin)

      expect(described_class.new(user, inactive).public_show?).to be(false)
    end

    it "allows super admins for active presentations" do
      user = create(:user)
      user.add_role(:super_admin)

      expect(described_class.new(user, presentation).public_show?).to be(true)
    end

    it "allows circle members for active presentations" do
      user = create(:user)
      user.add_role(:editor, circle)

      expect(described_class.new(user, presentation).public_show?).to be(true)
    end

    it "denies outsiders for active presentations" do
      user = create(:user)

      expect(described_class.new(user, presentation).public_show?).to be(false)
    end
  end
end
