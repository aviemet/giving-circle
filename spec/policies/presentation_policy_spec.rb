require "rails_helper"

RSpec.describe PresentationPolicy, type: :policy do
  let(:circle) { create(:circle) }
  let(:theme) { create(:theme, circle:) }
  let(:presentation) { create(:presentation, theme:) }

  shared_examples "circle admin only" do |action|
    it "allows super admins" do
      user = create(:user)
      user.add_role(:super_admin)

      expect(described_class.new(user, presentation).public_send(action)).to be(true)
    end

    it "allows circle admins" do
      user = create(:user)
      user.add_role(:admin, circle)

      expect(described_class.new(user, presentation).public_send(action)).to be(true)
    end

    it "denies theme admins" do
      user = create(:user)
      user.add_role(:admin, theme)

      expect(described_class.new(user, presentation).public_send(action)).to be(false)
    end

    it "denies theme editors" do
      user = create(:user)
      user.add_role(:editor, theme)

      expect(described_class.new(user, presentation).public_send(action)).to be(false)
    end

    it "denies unrelated users" do
      user = create(:user)

      expect(described_class.new(user, presentation).public_send(action)).to be(false)
    end
  end

  %i[activate? controls? index? overview? members? messaging? settings?].each do |action|
    describe "##{action}" do
      it_behaves_like "circle admin only", action
    end
  end
end
