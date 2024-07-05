# == Schema Information
#
# Table name: themes
#
#  id           :uuid             not null, primary key
#  name         :string
#  published_at :datetime
#  slug         :string           not null
#  status       :integer          default("draft")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  circle_id    :uuid             not null
#
# Indexes
#
#  index_themes_on_circle_id  (circle_id)
#  index_themes_on_slug       (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
class ThemeSerializer < ApplicationSerializer
  object_as :theme

  identifier :slug

  attributes(
    :name,
    :published_at,
    :status,
    :circle_id,
  )
end
