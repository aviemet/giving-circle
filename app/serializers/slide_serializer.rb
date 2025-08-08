# == Schema Information
#
# Table name: slides
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  slug       :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class SlideSerializer < ApplicationSerializer
  object_as :slide

  identifier :slug

  attributes(
    :title,
    :data,
  )
end
