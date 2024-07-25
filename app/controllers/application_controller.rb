class ApplicationController < ActionController::Base
  include Authentication
  include Authorization
  include InertiaCsrf
  include Localization
  include InertiaShare::Flash
  include InertiaShare::Auth
  include InertiaShare::Menu
  include InertiaShare::Params
  include Searchable
  include StrongParams
  # include ActiveCircleTracker
end
