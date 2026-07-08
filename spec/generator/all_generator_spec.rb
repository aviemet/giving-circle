require "rails_helper"
require "generator_spec"
require Rails.root.join("lib/generators/all/all_generator")

RSpec.describe AllGenerator, type: :generator do
  destination Rails.root.join("tmp/generators")
  arguments %w[widget]

  before do
    prepare_destination
  end

  it "creates a pundit policy and serializer" do
    run_generator ["pundit:policy", "widget"]
    run_generator ["serializer", "widget"]

    assert_file "app/policies/widget_policy.rb"
    assert_file "app/serializers/widget_serializer.rb"
  end
end
