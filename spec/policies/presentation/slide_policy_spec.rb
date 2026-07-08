require "rails_helper"

RSpec.describe Presentation::SlidePolicy, type: :policy do
  let(:record) { create(:slide) }

  it_behaves_like "super_admin_only_policy", %i[show create update destroy]
end
