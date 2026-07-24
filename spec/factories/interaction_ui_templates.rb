# == Schema Information
#
# Table name: interaction_ui_templates
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_interaction_ui_templates_on_slug  (slug) UNIQUE
#
FactoryBot.define do
  factory :interaction_ui_template do
    sequence(:name) { |number| "UI Template #{number}" }
    sequence(:slug) { |number| "ui-template-#{number}" }

    trait :allocation do
      name { "Allocation" }
      slug { "allocation" }
      initialize_with { InteractionUiTemplate.find_or_create_by!(slug: slug) { |template| template.name = name } }
    end

    trait :org_vote do
      name { "Organization vote" }
      slug { "org_vote" }
      initialize_with { InteractionUiTemplate.find_or_create_by!(slug: slug) { |template| template.name = name } }
    end

    trait :finalist_vote do
      name { "Finalist vote" }
      slug { "finalist_vote" }
      initialize_with { InteractionUiTemplate.find_or_create_by!(slug: slug) { |template| template.name = name } }
    end

    trait :pledges do
      name { "Pledges" }
      slug { "pledges" }
      initialize_with { InteractionUiTemplate.find_or_create_by!(slug: slug) { |template| template.name = name } }
    end
  end
end
