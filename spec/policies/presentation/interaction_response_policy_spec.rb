require "rails_helper"

RSpec.describe Presentation::InteractionResponsePolicy, type: :policy do
  let(:record) { create(:presentation_interaction_response) }

  it_behaves_like "super_admin_only_policy", %i[show create update destroy]
end
