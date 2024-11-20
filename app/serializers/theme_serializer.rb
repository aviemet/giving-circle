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
#
# Indexes
#
#  index_themes_on_slug  (slug) UNIQUE
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
