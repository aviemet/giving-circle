# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]

  # @route GET /login (new_user_session)
  def new
    render inertia: "Auth/Login", controller: {
      inertia_configuration: {
        layout: "Something"
      }
    }
  end

  # @route POST /login (user_session)
  def create
    # super
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    yield resource if block_given?
    respond_with resource, location: after_sign_in_path_for(resource)
  end

  # @route GET /logout (destroy_user_session)
  def destroy
    # super
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    yield if block_given?
    respond_to_on_destroy
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  end

  def layout_value
    LAYOUTS[:auth]
  end
end
