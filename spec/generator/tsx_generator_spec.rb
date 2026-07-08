require "rails_helper"
require "generator_spec"
require Rails.root.join("lib/generators/tsx/tsx_generator")

RSpec.describe TsxGenerator, type: :generator do
  destination Rails.root.join("tmp/generators")
  arguments %w[widgets/widget]

  before do
    prepare_destination
  end

  it "creates the page component" do
    run_generator

    assert_file "app/frontend/pages/Widgets/Widget/index.tsx"
  end
end
