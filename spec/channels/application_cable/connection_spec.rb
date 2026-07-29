require "rails_helper"

RSpec.describe ApplicationCable::Connection do
  it "is an ActionCable connection" do
    expect(described_class.ancestors).to include(ActionCable::Connection::Base)
  end
end
