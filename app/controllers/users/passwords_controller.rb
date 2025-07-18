# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  # @route GET /users/password/new (new_user_password)
  def new
    render inertia: "Auth/Passwords/New"
  end

  # def create
  #   super
  # end

  # def edit
  #   super
  # end

  # PUT /resource/password
  # def update
  #   super
  # end

  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end

  def layout_value
    LAYOUTS[:auth]
  end
end
