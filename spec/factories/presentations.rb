# == Schema Information
#
# Table name: presentations
#
#  id                       :uuid             not null, primary key
#  active                   :boolean          default(FALSE), not null
#  name                     :string           not null
#  settings                 :jsonb
#  slug                     :string           not null
#  template                 :boolean          default(FALSE), not null
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  presentation_template_id :uuid
#  theme_id                 :uuid             not null
#
# Indexes
#
#  index_presentations_on_presentation_template_id  (presentation_template_id)
#  index_presentations_on_slug                      (slug) UNIQUE
#  index_presentations_on_theme_id                  (theme_id)
#
# Foreign Keys
#
#  fk_rails_...  (presentation_template_id => presentations.id)
#  fk_rails_...  (theme_id => themes.id)
#
FactoryBot.define do
  factory :presentation do
    name { Faker::Lorem.words(number: rand(1..4)).map(&:capitalize).join(' ') }

    circle
  end
end
