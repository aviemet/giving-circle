# == Schema Information
#
# Table name: themes
#
#  id           :bigint           not null, primary key
#  title        :string
#  slug         :string           not null
#  published_at :datetime
#  status       :integer          default("draft")
#  circle_id    :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class ThemeSerializer < ApplicationSerializer
  object_as :theme

  identifier :slug

  attributes(
    :id,
    :slug,
    :title,
    :published,
    :status,
  )

end
