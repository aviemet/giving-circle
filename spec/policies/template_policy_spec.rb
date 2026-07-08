require "rails_helper"

RSpec.describe TemplatePolicy, type: :policy do
  let(:record) { create(:template) }

  it_behaves_like "super_admin_only_policy", %i[show create update destroy]
end
