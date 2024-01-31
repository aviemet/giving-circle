# == Schema Information
#
# Table name: themes
#
#  id           :bigint           not null, primary key
#  published_at :datetime
#  slug         :string           not null
#  status       :integer          default("draft")
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  circle_id    :bigint           not null
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
    :title,
    :published_at,
    :status,
    :circle_id,
  )
end
