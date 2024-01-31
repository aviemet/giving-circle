class Members::IndexSerializer < ApplicationSerializer
  object_as :member

  attributes(
    :id,
    :first_name,
    :last_name,
    :number,
    :created_at,
    :updated_at,
  )

  has_many :circle, serializer: Circles::OptionsSerializer
end
