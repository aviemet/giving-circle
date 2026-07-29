require "rails_helper"

RSpec.describe Users::OmniauthCallbacksController do
  it "is a Devise omniauth callbacks controller" do
    expect(described_class.ancestors).to include(Devise::OmniauthCallbacksController)
  end
end
