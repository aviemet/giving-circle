require "rails_helper"

RSpec.describe Messaging::ProviderCatalog do
  it "exposes providers grouped by medium" do
    expect(described_class.providers_by_medium).to eq(
      "email" => %w[smtp mailerlite],
      "sms" => %w[twilio plivo],
    )
  end

  it "resolves credential keys from presets and auth profiles" do
    expect(described_class.credential_keys("smtp")).to eq(%w[host port username password])
    expect(described_class.credential_keys("twilio")).to eq(%w[account_sid auth_token from_number])
    expect(described_class.credential_keys("mailerlite")).to eq(%w[api_token from_email])
  end

  it "resolves adapter classes for known presets" do
    expect(described_class.adapter_class("twilio")).to eq(Messaging::Adapters::Twilio)
  end

  it "builds form presets with auth profile metadata" do
    presets = described_class.presets_for_form

    expect(presets["twilio"]).to include(
      "medium" => "sms",
      "auth_profile" => "basic_auth",
    )
    expect(presets["twilio"]["fields"]).to include(
      { "key" => "auth_token", "secret" => true },
    )
  end
end
