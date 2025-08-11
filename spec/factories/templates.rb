# == Schema Information
#
# Table name: templates
#
#  id         :uuid             not null, primary key
#  name       :string
#  settings   :jsonb            not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_templates_on_slug  (slug) UNIQUE
#
FactoryBot.define do
  factory :template do
    name { Faker::Lorem.words(number: rand(1..4)).map(&:capitalize).join(" ") }

    circle
  end
end
