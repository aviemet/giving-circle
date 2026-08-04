# == Schema Information
#
# Table name: message_templates
#
#  id         :uuid             not null, primary key
#  body       :text             default(""), not null
#  medium     :string           not null
#  name       :string           not null
#  slug       :string           not null
#  subject    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  circle_id  :uuid             not null
#
# Indexes
#
#  index_message_templates_on_circle_id           (circle_id)
#  index_message_templates_on_circle_id_and_slug  (circle_id,slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
FactoryBot.define do
  factory :message_template do
    circle
    sequence(:name) { |number| "Message Template #{number}" }
    medium { "email" }
    subject { "Hello #membership.name" }
    body { "<p>Visit #interact_url</p>" }

    trait :sms do
      medium { "sms" }
      subject { nil }
      body { "Hello #membership.name - #interact_url" }
    end

    after(:build) do |template|
      next if template.slug.present?

      template.slug = template.name.parameterize if template.name.present?
    end
  end
end
