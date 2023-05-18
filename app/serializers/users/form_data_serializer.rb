class Users::FormDataSerializer < ApplicationSerializer
  object_as :user

  attributes(
    :email,
    :password,
    :password_confirmation,
    :active,
    :first_name,
    :last_name,
    :number,
  )
end
