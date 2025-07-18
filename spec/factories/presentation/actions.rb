# == Schema Information
#
# Table name: presentation_actions
#
#  id                 :uuid             not null, primary key
#  action_type        :integer
#  config             :jsonb
#  results            :jsonb
#  slug               :string
#  trigger_conditions :jsonb
#  trigger_type       :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
FactoryBot.define do
  factory :presentation_action, class: "Presentation::Action" do
    slug { "MyString" }
    action_type { 1 }
    config { "" }
    results { "" }
    trigger_type { 1 }
    trigger_conditions { "" }
  end
end
