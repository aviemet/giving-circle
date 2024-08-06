class PresentationLeverageSerializer < ApplicationSerializer
  object_as :presentation_leverage

  

  attributes(
    :name,
    :type,
  )
end
