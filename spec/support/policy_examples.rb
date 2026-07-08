RSpec.shared_examples "super_admin_only_policy" do |actions|
  actions.each do |action|
    describe "##{action}?" do
      it "allows super admins" do
        user = create(:user)
        user.add_role(:super_admin)

        expect(described_class.new(user, record).public_send("#{action}?")).to be(true)
      end

      it "denies unrelated users" do
        user = create(:user)

        expect(described_class.new(user, record).public_send("#{action}?")).to be(false)
      end
    end
  end
end
