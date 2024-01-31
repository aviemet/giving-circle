# == Schema Information
#
# Table name: circles
#
#  id         :bigint           not null, primary key
#  name       :string
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class CircleSerializer < ApplicationSerializer
  object_as :circle

  identifier :slug

  attributes(
    :id,
    :slug,
    :name,
  )
end
