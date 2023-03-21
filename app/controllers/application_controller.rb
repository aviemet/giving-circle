class ApplicationController < ActionController::Base
  include PublicActivity::StoreController

  protect_from_forgery with: :exception

  # Inertia requests do not need authenticity verification as they are not
  # subject to the same vulnerability as a standard web request
  skip_before_action :verify_authenticity_token, if: -> { request.inertia? }

  add_flash_types :success, :error, :warning

  private

  def set_locale
    locale = params[:locale].to_s.strip.to_sym
    I18n.locale = I18n.available_locales.include?(locale) ? locale : I18n.default_locale
  end
end
