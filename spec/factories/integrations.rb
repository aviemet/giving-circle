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
FactoryBot.define do
  factory :integration do
    circle
    sequence(:name) { |number| "Integration #{number}" }
    provider { "smtp" }
    medium { "email" }
    active { true }
    credentials do
      {
        "host" => "smtp.example.com",
        "port" => "587",
        "username" => "user@example.com",
        "password" => "secret",
        "security" => "tls",
        "domain" => "example.com",
        "address" => "noreply@example.com",
      }
    end

    trait :twilio do
      provider { "twilio" }
      medium { "sms" }
      credentials do
        {
          "account_sid" => "ACtest",
          "auth_token" => "token",
          "from_number" => "+15551234567",
        }
      end
    end

    trait :plivo do
      provider { "plivo" }
      medium { "sms" }
      credentials do
        {
          "auth_id" => "MAtest",
          "auth_token" => "token",
          "from_number" => "+15551234567",
        }
      end
    end

    trait :mailerlite do
      provider { "mailerlite" }
      medium { "email" }
      credentials do
        {
          "api_token" => "ml-token",
          "from_email" => "noreply@example.com",
        }
      end
    end
  end
end
