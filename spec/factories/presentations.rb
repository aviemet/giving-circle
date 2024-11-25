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

    after(:build) do |presentation, evaluator|
      after_build(presentation, evaluator)
    end

    after(:stub) do |presentation, evaluator|
      after_build(presentation, evaluator)
    end
  end
end

def after_build(presentation, evaluator)
  build_strategy = evaluator.instance_variable_get(:@build_strategy).to_sym
  if build_strategy == :stub
    build_strategy = :build_stubbed
  end

  if !evaluator.theme
    presentation.theme = FactoryBot.send(build_strategy, :theme, { circle: presentation.circle })
  elsif evaluator.theme.circle != presentation.circle
    old_circle = presentation.circle

    presentation.circle = evaluator.theme.circle

    if build_strategy == :create
      old_circle.destroy
    end
  end
end
