# == Schema Information
#
# Table name: themes_orgs
#
#  id           :uuid             not null, primary key
#  ask_cents    :integer
#  ask_currency :string           default("USD"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  org_id       :uuid             not null
#  theme_id     :uuid             not null
#
# Indexes
#
#  index_themes_orgs_on_org_id               (org_id)
#  index_themes_orgs_on_theme_id             (theme_id)
#  index_themes_orgs_on_theme_id_and_org_id  (theme_id,org_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (org_id => orgs.id)
#  fk_rails_...  (theme_id => themes.id)
#
FactoryBot.define do
  factory :themes_org do
    ask_cents { Faker::Number.between(from: 20000000, to: 35000000) }

    transient do
      circle { association(:circle) }
    end

    theme { association :theme, circle: circle }
    org { association :org, circle: circle }
  end
end
