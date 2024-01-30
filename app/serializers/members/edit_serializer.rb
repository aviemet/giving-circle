class Members::EditSerializer < ApplicationSerializer
  object_as :member

  attributes(
    :id,
    :first_name,
    :last_name,
    :number,
  )
end
