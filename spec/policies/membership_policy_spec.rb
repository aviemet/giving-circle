require "rails_helper"

RSpec.describe MembershipPolicy, type: :policy do
  let(:record) { create(:membership) }

  it_behaves_like "super_admin_only_policy", %i[show create update destroy]
end
