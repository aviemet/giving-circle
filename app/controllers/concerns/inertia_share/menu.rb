require 'active_support/concern'

module InertiaShare::Menu
  extend ActiveSupport::Concern

  included do
    inertia_share menu: lambda { {
      active_circle: current_user&.active_circle&.render(:inertia_share),
      circles: current_user&.circles&.render(:inertia_share),
    } }
  end
end
