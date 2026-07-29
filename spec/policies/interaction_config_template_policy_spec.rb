require "rails_helper"

RSpec.describe InteractionConfigTemplatePolicy, type: :policy do
  let(:record) { create(:interaction_config_template) }

  it_behaves_like "super_admin_only_policy", %i[show create update destroy]
end
