# == Schema Information
#
# Table name: presentations
#
#  id               :uuid             not null, primary key
#  active           :boolean          default(FALSE), not null
#  name             :string           not null
#  settings         :jsonb
#  slug             :string
#  template_version :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  active_slide_id  :uuid
#  template_id      :uuid
#  theme_id         :uuid             not null
#
# Indexes
#
#  index_presentations_on_active_slide_id  (active_slide_id)
#  index_presentations_on_slug             (slug) UNIQUE
#  index_presentations_on_template_id      (template_id)
#  index_presentations_on_theme_id         (theme_id)
#
# Foreign Keys
#
#  fk_rails_...  (active_slide_id => slides.id)
#  fk_rails_...  (template_id => templates.id)
#  fk_rails_...  (theme_id => themes.id)
#
FactoryBot.define do
  factory :presentation do
    name { Faker::Lorem.words(number: rand(1..4)).map(&:capitalize).join(" ") }

    template
    theme

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
