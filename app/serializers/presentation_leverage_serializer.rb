# == Schema Information
#
# Table name: presentation_leverages
#
#  id         :uuid             not null, primary key
#  name       :string
#  type       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class PresentationLeverageSerializer < ApplicationSerializer
  object_as :presentation_leverage

  

  attributes(
  )
end
