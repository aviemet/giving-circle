require "rails_helper"

RSpec.describe Presentation::ElementPolicy, type: :policy do
  let(:record) { create(:presentation_element) }

  it_behaves_like "super_admin_only_policy", %i[show create update destroy]
end
