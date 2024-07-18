class Circles::OptionsSerializer < ApplicationSerializer
  object_as :circle

  attributes(
    :id,
    :slug,
    :name,
  )
end
