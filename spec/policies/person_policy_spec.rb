require "rails_helper"

RSpec.describe PersonPolicy, type: :policy do
  let(:record) { create(:person) }

  it_behaves_like "super_admin_only_policy", %i[show create update destroy]
end
