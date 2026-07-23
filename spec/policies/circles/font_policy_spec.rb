require "rails_helper"

RSpec.describe Circles::FontPolicy, type: :policy do
  it "allows circle members to list and create fonts" do
    circle = create(:circle)
    user = create(:user)
    user.confirm
    user.add_role(:editor, circle)

    policy = described_class.new(user, circle)

    expect(policy.index?).to be(true)
    expect(policy.create?).to be(true)
  end

  it "denies users outside the circle" do
    circle = create(:circle)
    user = create(:user)
    user.confirm

    policy = described_class.new(user, circle)

    expect(policy.index?).to be(false)
    expect(policy.create?).to be(false)
  end

  it "allows super admins" do
    circle = create(:circle)
    user = create(:user)
    user.confirm
    user.add_role(:super_admin)

    policy = described_class.new(user, circle)

    expect(policy.index?).to be(true)
    expect(policy.create?).to be(true)
  end
end
