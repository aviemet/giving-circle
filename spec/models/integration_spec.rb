require "rails_helper"

# == Schema Information
#
# Table name: integrations
#
#  id          :uuid             not null, primary key
#  active      :boolean          default(TRUE), not null
#  credentials :text             default("{}"), not null
#  medium      :string           not null
#  name        :string           not null
#  provider    :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  circle_id   :uuid             not null
#
# Indexes
#
#  index_integrations_on_circle_id               (circle_id)
#  index_integrations_on_circle_id_and_medium    (circle_id,medium)
#  index_integrations_on_circle_id_and_provider  (circle_id,provider)
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
RSpec.describe Integration, type: :model do
  it "defaults active to true" do
    expect(described_class.new.active).to be(true)
  end

  it "assigns medium from provider" do
    integration = build(:integration, :twilio, medium: "email")

    expect(integration).to be_valid
    expect(integration.medium).to eq("sms")
  end

  it "encrypts credentials" do
    integration = create(:integration)

    raw = described_class.connection.select_value(
      described_class.sanitize_sql_array([
        "SELECT credentials FROM integrations WHERE id = ?",
        integration.id,
      ]),
    )

    expect(raw).not_to include("secret")
    expect(integration.reload.credentials["password"]).to eq("secret")
  end

  it "requires provider credential keys" do
    integration = build(:integration, credentials: { "host" => "smtp.example.com" })

    expect(integration).not_to be_valid
    expect(integration.errors[:credentials]).to be_present
  end
end
