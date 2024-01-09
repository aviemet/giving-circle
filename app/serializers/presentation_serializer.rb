# == Schema Information
#
# Table name: presentations
#
#  id         :bigint           not null, primary key
#  theme_id   :bigint           not null
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class PresentationSerializer < ApplicationSerializer
  object_as :presentation

  identifier :id

  attributes(
    :id,
    :name,
  )
end
