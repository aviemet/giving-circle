require "rails_helper"

RSpec.describe Renderable do
  it "resolves serializer names for ActiveRecord models" do
    expect(User.serializer_name).to eq("UserSerializer")
    expect(User.serializer_name(:persisted)).to eq("Users::PersistedSerializer")
  end

  it "renders a user through the default serializer" do
    user = create(:user)

    payload = user.render

    expect(payload[:email] || payload["email"]).to eq(user.email)
  end

  it "includes Renderable on non-ActiveRecord classes" do
    sample_class = Class.new do
      include Renderable

      def self.name
        "SampleRenderable"
      end
    end

    expect(sample_class.serializer_name(:show)).to eq("SampleRenderables::ShowSerializer")
  end
end
