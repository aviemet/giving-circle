# == Schema Information
#
# Table name: presentation_interactions
#
#  id                 :uuid             not null, primary key
#  config             :jsonb
#  interaction_type   :integer
#  results            :jsonb
#  slug               :string
#  trigger_conditions :jsonb
#  trigger_type       :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_presentation_interactions_on_slug  (slug) UNIQUE
#
FactoryBot.define do
  factory :presentation_interaction, class: "Presentation::Interaction" do
    slug { "MyString" }
    interaction_type { 1 }
    config { "" }
    results { "" }
    trigger_type { 1 }
    trigger_conditions { "" }
  end
end
