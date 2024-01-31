class Members::FormDataSerializer < ApplicationSerializer
  object_as :member

  attributes(
    :first_name,
    :last_name,
    :number,
  )
end
